// ===========================
// CONFIGURATION
// ===========================
const API_URL = 'http://localhost:8081/api/employees';

// ===========================
// NAVIGATION
// ===========================
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-pill').forEach(p => p.classList.remove('active'));

  document.getElementById(id).classList.add('active');

  const pills = document.querySelectorAll('.nav-pill');
  const map = { dashboard: 0, employees: 1, add: 2 };
  if (map[id] !== undefined) pills[map[id]].classList.add('active');

  if (id === 'employees') fetchEmployees();
  if (id === 'dashboard') fetchStats();
}

// ===========================
// TOAST NOTIFICATION
// ===========================
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type}`;
  setTimeout(() => { toast.className = 'toast hidden'; }, 3500);
}

// ===========================
// FETCH ALL EMPLOYEES
// ===========================
async function fetchEmployees() {
  const tbody = document.getElementById('empTableBody');
  tbody.innerHTML = '<tr><td colspan="8" class="loading">Loading…</td></tr>';

  try {
    const res = await fetch(API_URL);
    const employees = await res.json();
    renderTable(employees);
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="8" class="no-data">⚠️ Could not connect to server. Is Spring Boot running?</td></tr>';
  }
}

// ===========================
// RENDER TABLE
// ===========================
function renderTable(employees) {
  const tbody = document.getElementById('empTableBody');

  if (!employees || employees.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="no-data">No employees found. Add one!</td></tr>';
    return;
  }

  tbody.innerHTML = employees.map((emp, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${emp.firstName} ${emp.lastName}</strong></td>
      <td>${emp.email}</td>
      <td><span class="dept-badge">${emp.department}</span></td>
      <td>${emp.designation}</td>
      <td>₹${Number(emp.salary).toLocaleString('en-IN')}</td>
      <td>${emp.phone}</td>
      <td>
        <div class="actions">
          <button class="btn-edit" onclick="editEmployee(${emp.id})">Edit</button>
          <button class="btn-del" onclick="deleteEmployee(${emp.id}, '${emp.firstName}')">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ===========================
// SEARCH
// ===========================
let searchTimer;
function handleSearch(keyword) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(async () => {
    if (!keyword.trim()) { fetchEmployees(); return; }
    try {
      const res = await fetch(`${API_URL}/search?keyword=${encodeURIComponent(keyword)}`);
      const employees = await res.json();
      renderTable(employees);
    } catch (err) {
      console.error('Search failed', err);
    }
  }, 350);
}

// ===========================
// FETCH STATS (Dashboard)
// ===========================
async function fetchStats() {
  try {
    const res = await fetch(`${API_URL}/stats`);
    const data = await res.json();
    document.getElementById('totalCount').textContent = data.totalEmployees;
  } catch (err) {
    document.getElementById('totalCount').textContent = '—';
  }
}

// ===========================
// ADD / EDIT EMPLOYEE
// ===========================
async function submitForm() {
  const id = document.getElementById('empId').value;
  const employee = {
    firstName:   document.getElementById('firstName').value.trim(),
    lastName:    document.getElementById('lastName').value.trim(),
    email:       document.getElementById('email').value.trim(),
    phone:       document.getElementById('phone').value.trim(),
    department:  document.getElementById('department').value,
    designation: document.getElementById('designation').value.trim(),
    salary:      parseFloat(document.getElementById('salary').value),
  };

  // Basic frontend validation
  if (!employee.firstName || !employee.lastName || !employee.email ||
      !employee.department || !employee.designation || isNaN(employee.salary)) {
    showToast('Please fill in all fields correctly.', 'error');
    return;
  }

  const isEdit = id !== '';
  const url    = isEdit ? `${API_URL}/${id}` : API_URL;
  const method = isEdit ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    });

    const data = await res.json();

    if (res.ok) {
      showToast(isEdit ? '✅ Employee updated!' : '✅ Employee added!', 'success');
      resetForm();
      showSection('employees');
    } else {
      const msg = data.error || Object.values(data).join(', ');
      showToast(`❌ ${msg}`, 'error');
    }
  } catch (err) {
    showToast('❌ Server error. Is Spring Boot running?', 'error');
  }
}

// ===========================
// EDIT (prefill form)
// ===========================
async function editEmployee(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const emp = await res.json();

    document.getElementById('empId').value       = emp.id;
    document.getElementById('firstName').value   = emp.firstName;
    document.getElementById('lastName').value    = emp.lastName;
    document.getElementById('email').value       = emp.email;
    document.getElementById('phone').value       = emp.phone;
    document.getElementById('department').value  = emp.department;
    document.getElementById('designation').value = emp.designation;
    document.getElementById('salary').value      = emp.salary;

    document.getElementById('formTitle').textContent = 'Edit Employee';
    showSection('add');
  } catch (err) {
    showToast('❌ Failed to load employee data.', 'error');
  }
}

// ===========================
// DELETE EMPLOYEE
// ===========================
async function deleteEmployee(id, name) {
  if (!confirm(`Delete ${name}? This cannot be undone.`)) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    const data = await res.json();

    if (res.ok) {
      showToast(`✅ ${name} deleted successfully.`, 'success');
      fetchEmployees();
    } else {
      showToast(`❌ ${data.error}`, 'error');
    }
  } catch (err) {
    showToast('❌ Server error.', 'error');
  }
}

// ===========================
// RESET FORM
// ===========================
function resetForm() {
  document.getElementById('empId').value       = '';
  document.getElementById('firstName').value   = '';
  document.getElementById('lastName').value    = '';
  document.getElementById('email').value       = '';
  document.getElementById('phone').value       = '';
  document.getElementById('department').value  = '';
  document.getElementById('designation').value = '';
  document.getElementById('salary').value      = '';
  document.getElementById('formTitle').textContent = 'Add New Employee';
}

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  fetchStats();
});
