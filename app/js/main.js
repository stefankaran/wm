$.fn.dataTable.ext.pager.numbers_length = 7;
$(document).ready(function() {

    $('#table').DataTable( {
        "ajax": "data/info.txt",
         "dom": '<"table-header"f><"table-main"t><"table-footer"lp><"clear">'
    } );
    
} );
