(function () {
  function setError(field, message) {
    const errorNode = field.closest('.field-group')?.querySelector('.field-error');
    if (!errorNode) return;
    errorNode.textContent = message || '';
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function clearError(field) {
    setError(field, '');
  }

  function isValidIndianMobile(value) {
    return /^[6-9]\d{9}$/.test(String(value || '').replace(/\s+/g, ''));
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
  }

  function validateField(field) {
    const type = field.type;
    const isCheckbox = type === 'checkbox';
    const value = isCheckbox ? field.checked : String(field.value || '').trim();

    if (field.hasAttribute('required') && !isCheckbox && !value) {
      setError(field, 'This field is required.');
      return false;
    }

    if (isCheckbox && !field.checked) {
      setError(field, 'Please confirm your consent before continuing.');
      return false;
    }

    if (field.name === 'mobileNumber' && value && !isValidIndianMobile(value)) {
      setError(field, 'Please enter a valid 10-digit Indian mobile number.');
      return false;
    }

    if (field.name === 'email' && value && !isValidEmail(value)) {
      setError(field, 'Please enter a valid email address.');
      return false;
    }

    if (field.name === 'dateOfBirth' && value) {
      const dob = new Date(value);
      if (Number.isNaN(dob.getTime())) {
        setError(field, 'Please enter a valid date of birth.');
        return false;
      }
    }

    if (field.name === 'program' && !value) {
      setError(field, 'Please choose a program.');
      return false;
    }

    if (field.name === 'parentName' && value && value.length < 2) {
      setError(field, 'Please enter a valid parent or guardian name.');
      return false;
    }

    if (field.name === 'childName' && value && value.length < 2) {
      setError(field, 'Please enter a valid child name.');
      return false;
    }

    clearError(field);
    return true;
  }

  function handleFormSubmit(form, successMessage) {
    const requiredFields = Array.from(form.querySelectorAll('[required], [data-required]'));

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let valid = true;
      requiredFields.forEach(function (field) {
        if (!validateField(field)) {
          valid = false;
        }
      });

      if (!valid) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      const success = form.querySelector('.form-success');
      const formBody = form.querySelector('.form-body');
      if (success) {
        success.hidden = false;
        success.innerHTML = successMessage;
      }

      if (formBody) {
        formBody.hidden = true;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
      }
    });

    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });

      field.addEventListener('input', function () {
        if (field.dataset.touched === 'true') {
          validateField(field);
        }
      });

      field.addEventListener('change', function () {
        field.dataset.touched = 'true';
        validateField(field);
      });
    });
  }

  const enquiryForm = document.querySelector('[data-form-type="enquiry"]');
  if (enquiryForm) {
    handleFormSubmit(enquiryForm, [
      '<p class="success-title">Thank you for contacting Hello Kids – Little Legends.</p>',
      '<p>Our school team will get in touch with you soon.</p>',
      '<p class="success-meta">For immediate assistance: <a href="tel:7207311717">7207311717</a> / <a href="tel:9014983295">9014983295</a></p>',
      '<div class="success-cta">',
      '  <a class="primary-btn" href="https://wa.me/917207311717" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>',
      '  <a class="secondary-btn" href="tel:7207311717">Call the School</a>',
      '</div>'
    ].join(''));
  }

  const admissionForm = document.querySelector('[data-form-type="admission"]');
  if (admissionForm) {
    handleFormSubmit(admissionForm, [
      '<p class="success-title">Thank you! Your details have been captured on this form.</p>',
      '<p>Our school team can assist you with the next steps.</p>',
      '<p class="success-meta">For immediate assistance: <a href="tel:7207311717">7207311717</a> / <a href="tel:9014983295">9014983295</a></p>',
      '<div class="success-cta">',
      '  <a class="primary-btn" href="https://wa.me/917207311717" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>',
      '  <a class="secondary-btn" href="tel:7207311717">Call the School</a>',
      '  <a class="outline-btn" href="mailto:info@hellokidslittlelegends.in">Email the School</a>',
      '</div>'
    ].join(''));
  }
})();
