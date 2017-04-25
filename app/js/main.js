$.fn.dataTable.ext.pager.numbers_length = 7;
$(document).ready(function() {

    editor = new $.fn.dataTable.Editor( {
        table: "#table",
        fields: [ {
                label: "First name:",
                name: "first_name"
            }, {
                label: "Last name:",
                name: "last_name"
            }, {
                label: "Position:",
                name: "position"
            }, {
                label: "Office:",
                name: "office"
            }, {
                label: "Extension:",
                name: "extn"
            }, {
                label: "Start date:",
                name: "start_date",
                type: "datetime"
            }, {
                label: "Salary:",
                name: "salary"
            }
        ]
    } );




    // New record
    $('a.editor_create').on('click', function (e) {
        e.preventDefault();

        editor.create( {
            title: 'Create new record',
            buttons: 'Add'
        } );
    } );

    // Edit record
    $('#table').on('click', 'a.editor_edit', function (e) {
        e.preventDefault();

        editor.edit( $(this).closest('tr'), {
            title: 'Edit record',
            buttons: 'Update'
        } );
    } );

    // Delete a record
    $('#table').on('click', 'a.editor_remove', function (e) {
        e.preventDefault();

        editor.remove( $(this).closest('tr'), {
            title: 'Delete record',
            message: 'Are you sure you wish to remove this record?',
            buttons: 'Delete'
        } );
    } );


    $('#table').DataTable( {
        "dom": 'B<"table-header"f><"table-main"t><"table-footer"lp><"clear">',
        "ajax": "data/info.txt",
          columns: [
              { data: null, render: function ( data, type, row ) {
                  // Combine the first and last names into a single table field
                  return data.first_name+' '+data.last_name;
              } },
              { data: "position" },
              { data: "office" },
              { data: "extn" },
              { data: "start_date" },
              { data: "salary", render: $.fn.dataTable.render.number( ',', '.', 0, '$' ) }
          ],
          select: true,
          buttons: [
              { extend: "create", editor: editor }
          ],
          // rowCallback: function ( row, data ) {
          //     // Set the checked state of the checkbox in the table
          //     // $('span.i', row).css('background', 'red', data.age == 1 );
          //     $('span.i', row).addClass( 'i-ok', data.age == 1 );
          // }
          rowCallback: function ( row, data ) {
              // Set the checked state of the checkbox in the table
              $('input.editor-active', row).prop( 'checked', data.age == 1 );
          }
    } );


        // $('#table').DataTable().buttons().container()
        // .appendTo( $('.col-sm-6:eq(0)', $('#table').DataTable().table().container() ) );

    // Column Search
    function filterColumn ( i ) {
        $('#table').DataTable().column( i ).search(
            $('#col'+i+'_filter').val()
        ).draw();
    }
    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('td').attr('data-column') );
    } );


     $('#filter_col4').on('change', function () {
          $('#table').DataTable().columns(3).search( this.value ).draw();
      } );
      $('#filter_col5').on('change', function () {
          $('#table').DataTable().columns(4).search( this.value ).draw();
      } );

} );
