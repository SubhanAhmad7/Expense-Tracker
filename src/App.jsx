import { useEffect, useState } from 'react'
import './App.css'
import IncomeModal from './components/IncomeModal'
import ExpenseModal from './components/ExpenseModal';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [income, setIncome] = useState(() => {
    const storedIncome = JSON.parse(localStorage.getItem("income"));
    return (storedIncome) ? storedIncome : 0;
  });
  const [balance, setBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  
  const [expenses, setExpenses] = useState( () => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    return (storedExpenses) ? storedExpenses : [];
  });
  const [isIncomModalOpen, setIsIncomModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);


  const deleteNotify = () => toast.success("Successfully deleted !", {
    transition: Flip,
    autoClose: 1000,
    pauseOnHover: true,
    position: "top-right",
    theme:"colored"
  });

  // open the income modal function
  const openIncomModal = () => {
    setIsIncomModalOpen(true);
  };

  // close income modal function  
  const handleIncomModalClose = () => {
    setIsIncomModalOpen(false);
  };

  // open the expense modal function
  const openExpenseModal = () => {
    setIsExpenseModalOpen(true);
  };

  // close income modal function  
  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false);
  };

  // add income 
  const handleIncome = (amount) => {
    // es6 +amount is converting string amount to number
    setIncome(income + +amount);
    handleIncomModalClose();
  }
  console.log(income ,expenses)

  // add expense func
  const addExpense = (expense) => {

      const newExpAr = [...expenses, expense];
    setExpenses(newExpAr);
    setIsExpenseModalOpen(false);
  
  }
  console.log(expenses);

  const deleteItem = (index) => {
    const deleteConfirm = window.confirm("Are you sure you want to delete this content?")
    if (deleteConfirm) {
      const newItem = expenses.filter((el, i) => {
        return (i != index)
      })
      setExpenses(newItem)
      deleteNotify();
    }
  }

  useEffect(() => {
    let totalExp = 0;
    expenses.forEach((exp) => {
      totalExp += +exp.expense
    })
    setBalance(income - totalExp)
    setTotalExpense(totalExp)

localStorage.setItem("expenses", JSON.stringify(expenses));
localStorage.setItem("income", JSON.stringify(income));

    }, [income, expenses])
  return (
    <>
      <div className='container'>
        <div className='bg-dark text-white p-3'>
          <h1 className='text-center mb-5'>Expense Tracker</h1>
          <div className='row'>
            <div className='col-md-4 text-center'>
              <h3>Total Amount</h3>
              <h5 className='text-success'>${income}</h5>
              <button className='btn btn-success' onClick={openIncomModal}>Add Income</button>

              <IncomeModal handleIncome={handleIncome} isIncomModalOpen={isIncomModalOpen} handleIncomModalClose={handleIncomModalClose} />

            </div>

            <div className='col-md-4 text-center'>
              <h3>Expenses</h3>
              <h5 className='text-warning'>${totalExpense}</h5>
            </div>

            <div className='col-md-4 text-center'>
              <h3>Balance</h3>
              <h5 className='text-danger'>${balance}</h5>
              <button className='btn btn-danger' onClick={openExpenseModal}>Add Expense</button>
              <ExpenseModal addExpense={addExpense} isExpenseModalOpen={isExpenseModalOpen} closeExpenseModal={closeExpenseModal} />
            </div>
          </div>
        </div>
        <div className='p-3 bg-white'>
          <table className='table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Update</th>

              </tr>
            </thead>
            <tbody>
              {
                expenses.map((exp, i) => {
                  return (
                    <tr key={i}>
                      <td>{exp.date}</td>
                      <td>{exp.detail}</td>
                      <td>{exp.category}</td>
                      <td>${exp.expense}</td>
                      <td><button onClick={() => { deleteItem(i) }} className="btn btn-sm btn-danger me-2">Delete</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <ToastContainer/>
      </div>
    </>
  )
}

export default App