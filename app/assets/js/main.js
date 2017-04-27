$.fn.dataTable.ext.pager.numbers_length = 7;
$(document).ready(function() {

    // Tablet editor
    editor = new $.fn.dataTable.Editor( {
        table: "#table",
        "pagingType": "full_numbers",
        fields: [ {
                label: "Name *",
                name: "tag_name",
                'className': 'block'
            }, {
                name: "my_feed",
                type: "checkbox",
                options:   [
                  { label: 'My feed', value: '<span class="checked">OK</span>' }
                ],
                separator: ''
            }, {
                name: "my_fav",
                type: "checkbox",
                options: [
                    { label: "My favourites", value: '<span class="checked">OK</span>' }
                ],
                separator: ''
            }, {
                label: "Type",
                name: "tag_type",
                type:  "select",
                options: [
                    { label: "Fudbalski klub", value: "Fudbalski klub" },
                    { label: "Kosarkaski klub", value: "Kosarkaski klub" },
                    { label: "Teniser", value: "Teniser" }
                ]
            }, {
                label: "Image:",
                name: "image",
                type: "upload"
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

    // Table init
    $('#table').DataTable( {
        "dom": 'Bftlp',
        "ajax": "data/info.txt",
          columns: [
              {
                data: null,
                className: "dt-body-center",
                defaultContent: "",
              },
              { data: "tag_name" },
              { data: "tag_type" },
              { data: "my_feed",
                className: "dt-body-center"
              },
              { data: "my_fav",
                className: "dt-body-center"
              },
              {
                data: null,
                className: "dt-body-center",
                defaultContent: '<a style="text-decoration:none;" href="" class="editor_edit">E</a> / <a style="text-decoration:none;" href="" class="editor_remove">D</a>'
              }
          ],
          "columnDefs": [
            { "width": "6%", "targets": 0 },
            { "width": "35%", "targets": 1 },
            { "width": "35%", "targets": 2 },
            { "width": "9%", "targets": 3 },
            { "width": "9%", "targets": 4 }
          ],
          "order": [[ 1, 'asc' ]],
          buttons: [
              { extend: "create", editor: editor }
          ]
    } );

    // Column Search
    function filterColumn ( i ) {
        $('#table').DataTable().column( i ).search(
            $('#col'+i+'_filter').val()
        ).draw();
    }
    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('td').attr('data-column') );
    } );

    // Column Search / Select
     $('#filter_col4').on('change', function () {
          $('#table').DataTable().columns(3).search( this.value ).draw();
      } );
      $('#filter_col5').on('change', function () {
          $('#table').DataTable().columns(4).search( this.value ).draw();
      } );

      // Column order
      $('#table').DataTable().on( 'order.dt search.dt', function () {
          $('#table').DataTable().column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
              cell.innerHTML = i+1;
          } );
      } ).draw();

      // Validation
      editor.on( 'preSubmit', function ( e, o, action ) {
        if ( action !== 'remove' ) {
            var firstName = this.field( 'tag_name' );

            // Only validate user input values - different values indicate that
            // the end user has not entered a value
            if ( ! firstName.isMultiValue() ) {
                if ( ! firstName.val() ) {
                    firstName.error( 'A first name must be given' );
                }
            }

            // ... additional validation rules

            // If any error was reported, cancel the submission so it can be corrected
            if ( this.inError() ) {
                return false;
            }
        }
    } );

} );
