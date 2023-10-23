+++
date         = "2023-10-11"
title        = "Proves Mock amb Comprovació d'Objectes en Projectes Canigó 3.6.2"
description  = "Guia detallada sobre com realitzar proves mock amb Mockito en un projecte Canigó 3.6.2, incloent la comprovació d'objectes passats com a arguments en les crides als mètodes."
weight      = "1"
sections    = ["drafts"]
key          = "NOVEMBRE2023"
+++

## Introducció

En aquesta guia, abordarem amb detall com realitzar proves mock amb l'ús de la biblioteca Mockito en el marc de treball Canigó 3.6.2. Una de les pràctiques essencials en les proves unitàries és la verificació que els mètodes són cridats amb els arguments correctes. Dins del context de Canigó, aquesta verificació esdevé possible mitjançant l'ús de Mockito, una eina de prova unitària en l'entorn Java. Aprendrem com comprovar que els objectes passats com a arguments en les crides als mètodes compleixin amb les expectatives.

## Pas 1: Configuració de l'Entorn

Abans de començar, és imprescindible assegurar-se que disposem d'una configuració adequada de Mockito dins del nostre projecte Canigó 3.6.2. Podeu afegir Mockito com a dependència al projecte o bé mitjançant l'ús de les eines de gestió de dependències com Maven o Gradle.

## Pas 2: Realitzar Proves Mock

En l'exemple que segueix, verificarem que el mètode `authenticate` de `GicarAuthenticationService` sigui cridat de manera correcta amb els arguments desitjats. Farem servir `ArgumentCaptor` per capturar els objectes que es passen com a arguments.

```java
ArgumentCaptor<UsernamePasswordAuthenticationToken> argument = ArgumentCaptor.forClass(UsernamePasswordAuthenticationToken.class);

for (String gicarHeaderName : GicarAuthenticationService.GICAR_HEADER_NAME_LIST) {
    MockHttpServletRequest request = new MockHttpServletRequest();
    request.addHeader(gicarHeaderName, getGicarHeader());
    MockHttpServletResponse response = new MockHttpServletResponse();
    getAuthenticationService().authenticate(request, response);
}

verify(authenticationManager, times(GicarAuthenticationService.GICAR_HEADER_NAME_LIST.length)).authenticate(argument.capture());
List<UsernamePasswordAuthenticationToken> usernamePasswordAuthenticationTokenList = argument.getAllValues();

for (UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken : usernamePasswordAuthenticationTokenList) {
    assertTrue(usernamePasswordAuthenticationToken.getPrincipal() instanceof String);
    assertTrue(((String) usernamePasswordAuthenticationToken.getPrincipal()).startsWith(GICAR_HEADER));
}
```

En aquest codi, estem utilitzant un ArgumentCaptor per capturar els objectes del tipus UsernamePasswordAuthenticationToken que es passen com a arguments en les crides al mètode authenticate. A continuació, verifiquem que el mètode hagi estat cridat la quantitat adequada de vegades i comprovem que els objectes capturats compleixin amb els criteris de prova establerts.

## Conclusió
Mitjançant l'ús de Mockito, podem realitzar proves mock de manera efectiva dins dels projectes Canigó 3.6.2, incloent la comprovació dels objectes passats com a arguments en les crides als mètodes. Aquest procés és fonamental per garantir el funcionament correcte dels serveis i components. Aquesta guia us ha proporcionat una introducció detallada a aquesta tècnica de proves dins del context de Canigó.

Recordeu que podeu adaptar el codi i les descripcions segons les vostres necessitats i la complexitat dels vostres projectes.