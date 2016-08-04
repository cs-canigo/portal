#!/bin/bash
verbose="";

function mostrarAjuda {

  SCRIPT=`basename ${BASH_SOURCE[0]}`
  NORM=`tput sgr0`
  BOLD=`tput bold`
  RED=`tput setaf 1`

cat <<END;

Ajuda de ${BOLD}${RED}${SCRIPT}${NORM}

Els paràmetres de la línia de comandes són opcionals. Els següents paràmetres
son reconneguts:

  -v Inicia el servidor en mode ${BOLD}${RED}detallat${NORM}. Per defecte
     s'inicia en mode normal.
  -h Mostra aquesta ${BOLD}${RED}ajuda${NORM}.

END
}

while getopts ":v:h" opt; do
  case $opt in
    v)
      verbose="--verbose"
      ;;
    h)
      mostrarAjuda
      exit 0
      ;;
    \?)
      echo -e "Opció incorrecta -$OPTARG\n" >&2
      exit 0
      ;;
  esac
done
hugo server --watch --destination="../maqueta-comunicats-preview" $verbose
echo -e '\n'
