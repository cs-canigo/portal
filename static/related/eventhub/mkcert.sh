#!/usr/bin/env bash

OU="Departament de la Vicepresidencia i d'Economia i Hisenda"
name=""
out_path=""
platform_env=""
conf_env=""

show_help() {
    echo "Crea un parell de claus publica-privada i el certificat CSR per a un nou client de la plataforma. El CSR s'ha d'enviar a l'Agencia de Ciberseguretat perque el signi."
    echo "Vos heu guardar la clau privada (.key) que generi."
    echo "Requisits: disposar de les eines openSSL i keytool."
    echo
    echo "Syntax: mkcert.sh [-h|n|o|O]"
    echo "options:"
    echo "h     Mostra aquesta ajuda."
    echo "n     Nom de client. (Requerit)."
    echo "o     Directori de sortida. (Requerit)."
    echo "e     Entorn - pre/pro. (Requerit)."
    echo "O     Camp OU del certificat. (Opcional)."
    echo
    echo "Exemple:"
    echo "./mkcert.sh -n nouClient -o ./ -O \"Departament de la Vicepresidencia i d'Economia i Hisenda\""
    echo
}

# Get the options
while getopts ":n:o:e:O:h" option; do
    case $option in
        n) # name
            name=${OPTARG}
            ;;
        o) # output path
            out_path=${OPTARG}
            ;;
        e) # env - PRE/PRO
            platform_env=${OPTARG}
            ;;
        O) # OU field
            OU=${OPTARG}
            ;;
        h) # display help
            show_help
            exit 0
            ;;
        *) # display help
            show_help
            exit 0
            ;;
    esac
done

if [ "$name" = "" ]; then
    echo "Heu d'introduir el nom de client."
    echo
    show_help
    exit 1
fi

if [ "$out_path" = "" ]; then
    echo "Heu d'introduir el directori de sortida."
    echo
    show_help
    exit 1
fi

if [ "$platform_env" = "" ]; then
  echo "Heu d'introduir el entorn (pre/pro)."
  echo
  show_help
  exit 1
fi

if [ "$platform_env" != "pre" ] && [ "$platform_env" != "pro" ]; then
  echo "Heu d'introduir el entorn (pre/pro)."
  echo
  show_help
  exit 1
fi

if [ "$platform_env" = "pro" ]; then
  conf_env=""
fi

if [ "$platform_env" = "pre" ]; then
  conf_env=".pre"
fi

config="
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C = \"ES\"
ST = \"Barcelona\"
L = \"Barcelona\"
O = \"Generalitat de Catalunya\"
OU = \"$OU\"
CN = \"$name.client$conf_env.eventhub.intranet.gencat.cat\"

[v3_req]
keyUsage = critical, digitalSignature, keyEncipherment
extendedKeyUsage = clientAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = $name.client$conf_env.eventhub.intranet.gencat.cat
DNS.2 = eventhub.intranet.gencat.cat
"
conf_file="$(mktemp)"

echo "$config" > "$conf_file"

openssl genrsa -out "$out_path/$name".key 4096
openssl req -new -key "$out_path/$name".key -out "$out_path/$name".csr -config "$conf_file"

echo
echo "Procés finalitzat correctament."
echo "El vostre certificat s'ha generat a la ruta: $out_path"
