$(document).ready(function () {
  $('#employeeTable').DataTable({
    ajax: {
      url: 'MOCK_DATA.json',
      dataSrc: 'employees'
    },
    columns: [
      { data: 'id' },
      { data: 'firstName' },
      { data: 'lastName' },
      { data: 'email' },
      { data: 'department' },
      {
        data: 'salary',
        render: function (data) {
          return '$' + data;
        }
      }
    ]
  });
});