/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data,(err, response)=> {
      if (response.success === true) {
        document.activeElement.closest('.modal').querySelector('form').reset()
        App.setState( 'user-logged' );
        new Modal(document.activeElement.closest('.modal')).close()
      }
    })
  }
}