ShopifyMarketing.PartnersEmailSignupForm = (function() {
  const GA_ANALYTICS_CATEGORY = 'Partner signup email form';
  const FB_PIXEL_EVENT_NAME = 'PartnerSubmitEmail';
  const FORM_LOADING_CLASS = 'marketing-form--is-loading';

  function PartnersEmailSignupForm($form) {
    this.signupUrl = $form.attr('action');
    this.subscribePath = $form.data('subscribePath');

    $form.attr('action', this.subscribePath);

    ShopifyMarketing.AjaxEmailForm.apply(this, arguments);
  }

  PartnersEmailSignupForm.prototype = _.clone(
    ShopifyMarketing.AjaxEmailForm.prototype,
  );

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

  PartnersEmailSignupForm.prototype.handleSuccess = function() {
    this.trackSuccess().done(this.postSignup.bind(this));
  };

  PartnersEmailSignupForm.prototype.handleError = function() {
    this.trackError().done(this.postSignup.bind(this));
  };

  PartnersEmailSignupForm.prototype.postSignup = function() {
    this.$form.attr('action', this.signupUrl);
    this.$form.off().submit();
  };

  /*= =============== Tracking ================*/

  PartnersEmailSignupForm.prototype.trackSuccess = function() {
    this.trackFBEvent(FB_PIXEL_EVENT_NAME);
    return this.trackGAEvent(GA_ANALYTICS_CATEGORY, 'Success');
  };

  PartnersEmailSignupForm.prototype.trackError = function() {
    return this.trackGAEvent(GA_ANALYTICS_CATEGORY, 'Error');
  };

  PartnersEmailSignupForm.prototype.trackGAEvent = function(category, action) {
    return $.when(
      this.trackGAUniversal(category, action, ''),
      this.trackGAUniversal(category, action, '_other.'),
    );
  };

  PartnersEmailSignupForm.prototype.trackFBEvent = function(eventName) {
    window.fbq('track', eventName);
  };

  PartnersEmailSignupForm.prototype.trackGAUniversal = function(
    category,
    action,
    trackerName,
  ) {
    const dfr = $.Deferred();

    if (_.isFunction(window._gaUTracker)) {
      window._gaUTracker(`${trackerName}send`, 'event', {
        eventCategory: category,
        eventAction: action,
        hitCallback() {
          dfr.resolve();
        },
      });
    } else {
      dfr.resolve();
    }

    setTimeout(() => {
      dfr.resolve();
    }, 300);

    return dfr;
  };

  return PartnersEmailSignupForm;
})();
