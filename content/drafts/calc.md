+++
date        = "2024-11-25"
title       = "Calculadora modernització"
sections    = []
categories  = []
+++
<style> 
    #costForm {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    #costForm label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
    }

    #costForm input[type="text"],
    #costForm input[type="number"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1.2em;
    }

    #result {
        font-size: 1.8em;
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        padding: 3em;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        height: 100%;
    }

    .result-value-green{
        color: green;
    }

    .result-value-red{
        color: red;
    }

    .result-value{
        font-weight: bold;
    }

    .row-calc{
        display: flex; 
        justify-content: space-between;        
    }

    .column-calc{
        flex: 1; 
    }

    .column-calc:first-child{
        margin-right: 20px;        
    }


    @media (max-width: 768px) {

        #result{
            padding: 1em;
            font-size: 1.5em;
        }

        .row-calc {
            flex-direction: column;
        }

        .column-calc:first-child {
            margin-right: 0;
            margin-bottom: 20px;
        }
    }


</style>


<div class="row-calc">
    <div class="column-calc">
        <form id="costForm">
            <label for="currentCost">Cost actual anual infra:</label>
            <input type="text" id="currentCost" name="currentCost" oninput="calculateCost()"><br><br>
            <label for="futureCost">Cost futur anual infra:</label>
            <input type="text" id="futureCost" name="futureCost" oninput="calculateCost()"><br><br>
            <label for="testCost">Cost proves:</label>
            <input type="text" id="testCost" name="testCost" oninput="calculateCost()"><br><br>
            <label for="migrationCost">Cost migració:</label>
            <input type="text" id="migrationCost" name="migrationCost" oninput="calculateCost()"><br><br>
        </form>
    </div>
    <div class="column-calc">
        <p id="result">Omple les dades de la calculadora amb els costos estimats.</p>
    </div>
    
</div>

<script>

    currencyInput = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = (value / 100).toLocaleString('ca-ES', { style: 'currency', currency: 'EUR'});    
        e.target.value = value;
    };


    document.getElementById('currentCost').addEventListener('input', currencyInput);
    document.getElementById('futureCost').addEventListener('input', currencyInput);
    document.getElementById('testCost').addEventListener('input', currencyInput);
    document.getElementById('migrationCost').addEventListener('input', currencyInput);

    function calculateCost() {

        let currentCost = document.getElementById('currentCost').value !== "" ? parseFloat(document.getElementById('currentCost').value.replace(/\D/g, '')/100) : 0;
        let futureCost = document.getElementById('futureCost').value !== "" ? parseFloat(document.getElementById('futureCost').value.replace(/\D/g, '')/100) : 0;
        let testCost = document.getElementById('testCost').value !== "" ? parseFloat(document.getElementById('testCost').value.replace(/\D/g, '')/100) : 0;
        let migrationCost = document.getElementById('migrationCost').value !== "" ? parseFloat(document.getElementById('migrationCost').value.replace(/\D/g, '')/100) : 0;

        const result = (futureCost - currentCost) + testCost + migrationCost;
        if(document.getElementById('currentCost').value && document.getElementById('futureCost').value){
            document.getElementById('result').innerHTML = 'Diferència de cost AS IS / TO BE: <span class="'+((futureCost - currentCost)<=0?"result-value-green":"result-value-red")+'">' + (futureCost - currentCost).toLocaleString('ca-ES', { style: 'currency', currency: 'EUR' }) + "</span>";
        }
        //document.getElementById('result').innerText += '\nResult: ' + result;

        if(testCost + migrationCost>0){
            document.getElementById('result').innerHTML += '<br /><br /><br />Cost migració + proves: <span class="result-value">' + (testCost + migrationCost).toLocaleString('ca-ES', { style: 'currency', currency: 'EUR' }) + "</span>";
        }


        if (result > 0) {
            const amortizationTime = (testCost + migrationCost) / (futureCost - currentCost);

            if(amortizationTime===Infinity){
                document.getElementById('result').innerHTML += '<br /><br /><br /><span class="result-time-label">Temps d\'amortització:</span> <span class="result-value">♾️</span>';
                return;
            }

            let years = amortizationTime.toFixed(2);
            years = years < 0 ? years*-1 : years;
            let totalDays = amortizationTime * 365;
            totalDays = totalDays < 0 ? totalDays*-1 : totalDays;
            years = Math.floor(totalDays / 365);
            const months = Math.round((totalDays % 365) / 30);
            const days = Math.round((totalDays % 365) % 30);

            if(amortizationTime!==0){
                document.getElementById('result').innerHTML += '<br /><br /><br /><span class="result-time-label">Temps d\'amortització:</span> <span class="result-value">' + years + (years===1?" any":" anys") + ', ' + months + ' mesos, ' + days + ' dies</span>';
            }

        }else if(result < 0 && futureCost<currentCost && futureCost>0 && testCost>0 && migrationCost>0){
            document.getElementById('result').innerHTML += '<br /><br /><br /><span class="result-time-label">Temps d\'amortització:</span> <span class="result-value result-value-green">&lt;1 any</span>';
        }
    }

</script>