/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(),(err, response)=> {
      if (response.success === true){
        this.element.querySelector("select").innerHTML = '';
        this.element.querySelector("select").insertAdjacentHTML('afterbegin',
        response.data.reduce((sum, elem) => {
          return sum += `<option value="${elem.id}">${elem.name}</option>`
        },''));
      }
    })

            // this.element.querySelector("#income-accounts-list").
            // insertAdjacentHTML('afterbegin',`<option value="${elem.id}">${elem.name}</option>`);
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data,(err, response)=> {
      if (response.success === true) {
        this.element.reset()
        App.getModal("newIncome").close()
        App.getModal("newExpense").close()
        App.update() 
      }
    })
  }
}