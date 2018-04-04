/*
Responsibilities include:
1. Presenting a form state (valid, invalid, submitting ...) in the DOM using CSS classes
2. Passing my data into an API that sends an AJAX request
*/

// A focus on messages reveals the possibility of a FormApi and Validator class
PartnersEmailSignupForm.prototype.handleSubmit = function(evt) {
  evt.preventDefault();

  if (this.isValid()) {
    this.displayLoading();
    // Introduce a dependency on FormApi
    FormApi.sendData(this.data())
      .done((response) => this.displaySuccess(response))
      .fail((errors) => this.displayErrors(errors))
      .always(() => {
        // OC: AjaxForm removes loading class. This adds it back so redirect UX is more seamless.
        this.displayLoading();
      });
  } else {
    this.displayErrors();
  }
};

PartnersEmailSignupForm.prototype.isValid = function() {
  // Introduce a dependency on Validator
  this.errors = Validator.validate({email: this.data().email});
  return this.errors.length;
};
