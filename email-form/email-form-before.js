// Part of a marketing website that collects emails for signups.

PartnersEmailSignupForm.prototype.handleSubmit = function(evt) {
  evt.preventDefault();

  this.fields = this.$form.serializeJSON();
  this.fields.email = this.fields['partner[email]'];

  this.errors = [];
  this.validate(this.fields);

  if (this.errors.length) {
    this.handleError();
  } else {
    this.$form.addClass(FORM_LOADING_CLASS);
    this.sendData(this.fields).always(() => {
      // AjaxForm removes loading class. This adds it back so redirect UX is more seamless.
      this.$form.addClass(FORM_LOADING_CLASS);
    });
  }
};
