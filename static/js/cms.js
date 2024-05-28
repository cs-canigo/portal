var getConfigKey = function(data, key){
    var re = new RegExp("^[^#]\\s*[^#]" + key + "\\s*:\\s*\\b(.*)\\b","igm");
    var matches = re.exec(data);
    if(!matches){
        console.log(key + " not set");
        return null;
    }
    return matches[1];
}

document.addEventListener("DOMContentLoaded", function() {
    //Gets config type to adapt cms in frontend
    fetch("/admin/config.yml?" + (+new Date()))
        .then(response => response.text())
        .then(configyml => {
        if(!window.cms){
            window.cms = {};
        }

        //check if git gateway or github auth
        if(getConfigKey(configyml, "name")==="git-gateway"){
            console.log("netlify identity - gitgateway auth mode");
            window.cms.type = "gitgateway";

            //Netlify identity widget
            if(window.netlifyIdentity){
                window.netlifyIdentity.on("init", user => {
                    if (!user) {
                        window.netlifyIdentity.on("login", (user) => {
                            //document.location.href = "/admin/";
                            document.location.href = "?cms=true";
                        });
                    }
                });
            }
        }else if(getConfigKey(configyml, "name")==="github"){
            console.log("github auth mode");
            window.cms.type = "github";
            window.cms.repo = getConfigKey(configyml, "repo");
            window.cms.base_url = getConfigKey(configyml, "base_url");
            window.cms.client_id = getConfigKey(configyml, "client_id");

            var netlifyIdentityButtons = document.querySelectorAll("*[data-netlify-identity-button]");
            netlifyIdentityButtons.forEach(function(button) {
                button.style.display = "none"; // hides netlify identity login button
            });
        }

        console.log("loading cms objects...");

        var currentHost = window.location.host;
        var path = window.location.pathname;
        path = path.split("/").filter(function(value){
            if(value){
                return value;
            }
        });
        
        if(currentHost.indexOf(":")>-1){
            currentHost = currentHost.slice(0, currentHost.indexOf(":"));
        }

        //attach cms=true param to internal links
        const links = document.querySelectorAll("a");
        links.forEach(link => {
            if(this.hostname===currentHost && this.href.indexOf("/admin/#/")===-1 && this.href.indexOf("?cms=true")===-1){
                this.href = this.href + "?cms=true";
            }
        })

        //Bind events to button and input text to create section
        document.getElementById("sectionNameButton").addEventListener("click", function(){
            createSection(window.cms.currentlang, window.cms.langs);
        })

        document.getElementById("sectionName").addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                createSection(window.cms.currentlang, window.cms.langs);
            }
        });

        //show cms on footer and sections hidden when cms param not true
        document.getElementById("cms-editor").style.display = "block";
        var cmsPreviewElements = document.getElementsByClassName("cmsPreview");
        for (var i = 0; i < cmsPreviewElements.length; i++) {
            cmsPreviewElements[i].style.display = "block";
        }

        //MODAL INFO WINDOW
        window.cms.modal = new tingle.modal({
            footer: true,
            stickyFooter: false,
            closeMethods: ['overlay', 'button', 'escape'],
            closeLabel: "Close",
            //cssClass: ['custom-class-1', 'custom-class-2'],
            onOpen: function() {
                console.log('modal open');
            },
            onClose: function() {
                console.log('modal closed');
            },
            beforeClose: function() {
                return true; // close the modal
            }
        });
    });
})

//Git management for new sections
function gitPut(files, token) {
    if (window.cms.type === "github") {
        var gitEndpoint = "https://api.github.com/repos/" + window.cms.repo + "/contents/content/";
    }

    var file;
    if (files.length) {
        file = files.shift();
    }

    if (!file) {
        return;
    }
    var url = gitEndpoint + file[0];

    fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'message': 'new section',
            'content': window.btoa(file[1])
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else if (response.status === 422) {
                window.cms.modal.setContent('<h1>Section exists</h1>');
                window.cms.modal.open();
            } else if (response.status === 404) {
                window.cms.modal.setContent('<h1>Path not found</h1>');
                window.cms.modal.open();
            } else if (response.status === 401) {
                window.localStorage.removeItem("netlify-cms-user");
                window.localStorage.removeItem("token");
                githubAuth(function () {
                    gitPut(files, window.localStorage.getItem("token"));
                });
            }
        })
        .then(function (data) {
            if (files.length === 0) {
                window.cms.modal.setContent('<h1>Section has been created... Wait until site is rebuilt...</h1>');
                window.cms.modal.open();
            } else {
                gitPut(files, token);
            }
        })
        .catch(function (error) {
            console.log("error: " + error);
            gitPut(files, token);
        });
}

function createSection(lang, langs){

    window.cms.modal.setContent('<button class="btn btn-lg btn-warning"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span></button>');
    window.cms.modal.open();

    if(langs){
        langs = langs.split(",");
    }else{
        langs = [lang]
    }

    if (window.cms.type === "gitgateway" && document.querySelector(".netlify-identity-button").textContent.toLowerCase() === "log in") {
        window.cms.modal.setContent('<h1>You are not logged</h1>');
        window.cms.modal.open();
        return;
    }

    var path = window.location.pathname || "";

    if(lang && path){
        path = path.replace("/"+lang+"/", "");
    }
    var newSection = document.getElementById("sectionName").value;
    if(!newSection){
        window.cms.modal.setContent('<h1>Inform section name</h1>');
        window.cms.modal.open();
        return;
    }

    var fnPush = function(token) {
        fetch("/admin/_index.md")
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                if (langs.length) {
                    var files = [];
                    langs.map(function(v) {
                        data = data.replace("{{title}}", newSection).replace("{{lang}}", v);
                        files.push([
                            path + newSection + "/_index-" + v + ".md",
                            data
                        ]);
                    });
                    //gitPut(path + newSection + "/_index-" + v + ".md", data, token);
                    gitPut(files, token);
                }
            });
    }

    var token = "";

    //get token from gitgateway or github
    if(window.cms.type==="gitgateway"){
        netlifyIdentity.currentUser().jwt().then();
        token = netlifyIdentity.currentUser().token.access_token;
        fnPush(token)
    }else if(window.cms.type==="github"){
        token = window.localStorage.getItem("decap-cms-user") || null;
        token = token ? (JSON.parse(window.localStorage.getItem("decap-cms-user")).token || null) : window.localStorage.getItem("token");

        if(!token){
            githubAuth(function(){
                fnPush(window.localStorage.getItem("token"));
            });
        }else{
            fnPush(token)
        }
    }
    
}

/**********************************************************************************************************************
   
   Git Auth Flow
   More info: https://github.com/netlify/netlify-cms/blob/190f9c261380b07b1d9800ac538f31a3fc04973c/src/lib/netlify-auth.js

***********************************************************************************************************************/
function githubAuth(cb){
    if(!window.localStorage.getItem('token')){
        window.cms.authWindow = window.open(
            "https://github.com/login/oauth/authorize?scope=repo&client_id=" + window.cms.client_id,
            'NetlifyCMS Authorization',
            'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, ' +
            ('width=600, height=600, top=200, left=200);')
        );                    
        window.cms.authWindow.focus();                
    }else{
        //console.log(window.localStorage.getItem('token'))
    }
    window.addEventListener('message', access(cb), false);    
}

function authorization(cb){
    const fnAuth = (e) => {
        var data, err;
        if (e.origin !== window.cms.base_url) { return; }
        if (e.data.indexOf('authorization:github:success:') === 0) {
            data = JSON.parse(e.data.match(new RegExp('^authorization:github:success:(.+)$'))[1]);
            window.removeEventListener('message', fnAuth, false);
            window.localStorage.setItem('token', data.token);
            window.cms.authWindow.close();
            cb();
        }
        if (e.data.indexOf('authorization:github:error:') === 0) {
            console.log('Got authorization error');
            err = JSON.parse(e.data.match(new RegExp('^authorization:github:error:(.+)$'))[1]);
            window.removeEventListener('message', fnAuth, false);
            window.cms.authWindow.close();
        }
    };
    return fnAuth;
}

function access(cb){
    const fnAccess = (e) => {
      if (e.data === ('authorizing:github')){ //&& e.origin === window.cms.base_url) {
        window.removeEventListener('message', fnAccess, false);
        window.addEventListener('message', authorization(cb), false);
        return window.cms.authWindow.postMessage(e.data, e.origin);
      }
    };
    return fnAccess;
}