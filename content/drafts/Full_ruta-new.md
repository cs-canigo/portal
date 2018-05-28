+++
date        = "2018-05-28"
title       = "Prova Datatables v1"
description = "Prova Datatables v1"
weight		= 3
type = "estandard"
toc         = true
versio      = "1.0"
responsable = "Unitat d'arquitectura"
estandards =  ["programari"]
codi = "35.080.03"

+++

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="../tableStyle.css">
<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>

<table id="FullRuta" class="display" style="width:100%">
        <thead>
            <tr>
                <th></th>
                <th>Producte</th>
                <th>Categoria</th>
                <th>Obsolet</th>
                <th>Suportat</th>
                <th>Versió Actual CTTI</th>
                <th>En Roadmap CTTI</th>
                <th>Emergent</th>
            </tr>
        </thead>
        <tfoot>
            <tr>
                <th></th>
                <th>Producte</th>
                <th>Categoria</th>
                <th>Obsolet</th>
                <th>Suportat</th>
                <th>Versió Actual CTTI</th>
                <th>En Roadmap CTTI</th>
                <th>Emergent</th>
            </tr>
        </tfoot>
</table>

<script>
$(document).ready(function() {
    var table = $('#FullRuta').DataTable( {
        "ajax": "../Inventari.txt",
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "Producte" },
            { "data": "Categoria" },
            { "data": "Obsolet" },
            { "data": "Suportat" }
            { "data": "Versio_Actual" }
            { "data": "Roadmap" }
            { "data": "Emergent" }
        ],
        "order": [[1, 'asc']]
    } );
 } );
</script>
 
