/*
Reponsibilities include:
1. Presenting a form state (valid, invalid, submitting ...) in the DOM using CSS classes
2. Turning data from the DOM into data suitable for some server
3. Validating an email address
4. Building and sending an AJAX request with an email in it
*/

PartnersEmailSignupForm.prototype.handleSubmit = function(evt) {
  evt.preventDefault();

  this.fields = this.$form.serializeJSON();
  this.fields.email = this.fields['partner[email]'];

  // What is up with this array initialization?
  this.errors = [];
  // What if I wanted to validate an email in some other class?
  this.validate(this.fields);

  if (this.errors.length) {
    this.handleError();
  } else {
    this.$form.addClass(FORM_LOADING_CLASS);
    // What if I wanted to change how my server works?
    this.sendData(this.fields).always(() => {
      // OC: AjaxForm removes loading class. This adds it back so redirect UX is more seamless.
      this.$form.addClass(FORM_LOADING_CLASS);
    });
  }
};
