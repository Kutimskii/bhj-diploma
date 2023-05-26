/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data,(err, response)=> {
      if (response.success === true) {
        document.activeElement.closest('.modal').querySelector('form').reset()
        App.setState( 'user-logged' );
        new Modal(document.activeElement.closest('.modal')).close()
      }
      
      }
    )
  }
}