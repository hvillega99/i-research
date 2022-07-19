$(document).ready( function () {
    $('#sortedTable').DataTable({
        paging: false,
        searching: false,
        info: false,
        scrollY: 400,
        scrollX: true
    });
} );

$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function(e){
    $($.fn.dataTable.tables(true)).DataTable()
    .columns.adjust();

});