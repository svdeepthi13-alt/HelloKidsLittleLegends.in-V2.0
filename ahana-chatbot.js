(function () {
  if (document.querySelector('.ahana-chatbot')) {
    return;
  }

  const schoolInfo = {
    name: 'Hello Kids – Little Legends',
    address: 'H-No.4-179/5, 1st floor, near Aparna Kanopy villas Exit Gate, Gundlapochampally Village & Municipality, Landmark: Opp: Casa Triambak., Telangana, Hyderabad, India 500014',
    phone: '7207311717',
    phoneAlt: '9014983295',
    whatsapp: 'https://wa.me/917207311717',
    email: 'info@hellokidslittlelegends.in',
    timings: 'Mon – Fri: 9:00 AM – 3:00 PM',
    programs: [
      'Playgroup / Pre-Nursery',
      'Montessori-1 / Nursery',
      'Montessori-2 / LKG',
      'Montessori-3 / UKG',
      'Day Care'
    ]
  };

  function answerQuestion(question) {
    const q = String(question || '').trim().toLowerCase();

    if (!q) {
      return 'I can help with the school details you may need. Try asking about programs, admissions, timings, location, or contact information.';
    }

    if (/(hello|hi|hey|good morning|good evening|greeting)/.test(q)) {
      return 'Hello! I’m AHANA, and I’m happy to help with school information. You can ask about programs, admissions, timings, location, or contact details.';
    }

    if (/(about|who are you|what is|school|preschool|montessori)/.test(q)) {
      return 'Hello Kids – Little Legends is a nurturing Montessori-inspired preschool where children learn through exploration, independence, creativity and meaningful experiences.';
    }

    if (/(program|curriculum|age group|playgroup|nursery|lkg|ukg|day care|montessori)/.test(q)) {
      return 'We offer Playgroup / Pre-Nursery, Montessori-1 / Nursery, Montessori-2 / LKG, Montessori-3 / UKG and Day Care.';
    }

    if (/(admission|enroll|enrol|apply|register|join|seat)/.test(q)) {
      return 'We would be glad to help you begin the admission process. You can speak with our school team directly or use the WhatsApp option for a quick conversation.';
    }

    if (/(location|where|visit|address|campus|map|direction)/.test(q)) {
      return 'Our campus is located at ' + schoolInfo.address + '.';
    }

    if (/(timing|hours|open|close|time|when)/.test(q)) {
      return 'School hours are ' + schoolInfo.timings + '.';
    }

    if (/(phone|call|contact|number|whatsapp|chat)/.test(q)) {
      return 'You can call us at ' + schoolInfo.phone + ' / ' + schoolInfo.phoneAlt + ' or connect with us on WhatsApp here: ' + schoolInfo.whatsapp + '.';
    }

    if (/(email|mail)/.test(q)) {
      return 'You can email us at ' + schoolInfo.email + '.';
    }

    if (/(teacher|team|director|staff)/.test(q)) {
      return 'Our team includes caring educators and a Center Director focused on child-centred learning, safety and purposeful discovery.';
    }

    if (/(fee|fees|cost|price|tuition|scholarship)/.test(q)) {
      return 'I can help with the school information available on this website. The school team can guide you on the most relevant next steps for your family.';
    }

    if (/(book|visit|tour|school visit)/.test(q)) {
      return 'You are welcome to book a school visit or speak with our team directly. We would be happy to help you learn more about the campus and programs.';
    }

    if (/(i don't know which program|program is right|age)/.test(q)) {
      return 'What is your child’s age?';
    }

    return 'I can help with the school information available on this website. Try asking about programs, admissions, timings, location or contact details.';
  }

  const chatbot = document.createElement('div');
  chatbot.className = 'ahana-chatbot';

  chatbot.innerHTML = [
    '<button class="ahana-chatbot__launcher" type="button" aria-label="Chat with us" aria-expanded="false" aria-controls="ahana-chatbot-panel">',
    '  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-8.8 11.7L2 21l6.4-1.2A9 9 0 1 0 12 3Zm-1 5.5h2v4h-2Zm0 5.5h2v2h-2Z"/></svg>',
    '</button>',
    '<div class="ahana-chatbot__panel" id="ahana-chatbot-panel" hidden>',
    '  <div class="ahana-chatbot__header">',
    '    <button class="ahana-chatbot__close" type="button" aria-label="Close chat">×</button>',
    '  </div>',
    '  <div class="ahana-chatbot__messages">',
    '    <div class="ahana-chatbot__message ahana-chatbot__message--bot">Hi! I’m AHANA. Ask me about programs, admissions, timings, location, or contact details.</div>',
    '    <div class="ahana-chatbot__quick-actions">',
    '      <button type="button" data-question="Make an Enquiry">Make an Enquiry</button>',
    '      <button type="button" data-question="Admission Enquiry">Admission Enquiry</button>',
    '      <button type="button" data-question="What programs do you offer?">Programs</button>',
    '      <button type="button" data-question="Where is the school located?">Location</button>',
    '    </div>',
    '  </div>',
    '  <div class="ahana-chatbot__links">',
    '    <a href="https://wa.me/917207311717" target="_blank" rel="noopener noreferrer">WhatsApp</a>',
    '    <a href="tel:7207311717">Call us</a>',
    '  </div>',
    '  <form class="ahana-chatbot__composer" autocomplete="off">',
    '    <label class="sr-only" for="ahana-chatbot-input">Ask</label>',
    '    <input id="ahana-chatbot-input" type="text" maxlength="200" placeholder="Ask..." aria-label="Ask" />',
    '    <button type="submit" aria-label="Send message">Send</button>',
    '  </form>',
    '</div>'
  ].join('');

  const footerSlot = document.querySelector('.footer-chat-slot');
  if (footerSlot) {
    footerSlot.appendChild(chatbot);
  } else {
    document.body.appendChild(chatbot);
  }

  const launcher = chatbot.querySelector('.ahana-chatbot__launcher');
  const panel = chatbot.querySelector('.ahana-chatbot__panel');
  const closeButton = chatbot.querySelector('.ahana-chatbot__close');
  const form = chatbot.querySelector('.ahana-chatbot__composer');
  const input = chatbot.querySelector('#ahana-chatbot-input');
  const messages = chatbot.querySelector('.ahana-chatbot__messages');
  const quickButtons = chatbot.querySelectorAll('[data-question]');

  function openPanel() {
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    setTimeout(function () {
      input.focus();
    }, 80);
  }

  function closePanel() {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
  }

  function appendMessage(role, text) {
    const bubble = document.createElement('div');
    bubble.className = 'ahana-chatbot__message ' + (role === 'bot' ? 'ahana-chatbot__message--bot' : 'ahana-chatbot__message--user');
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleQuestion(text, fromUser) {
    const safeText = String(text || '').trim();
    if (!safeText) {
      return;
    }

    if (fromUser) {
      appendMessage('user', safeText);
    }

    if (safeText === 'Make an Enquiry') {
      const prompt = "I’d be happy to help you get started.\n\nYou can submit a quick enquiry with your contact details, your child's age and the program you’re interested in.";
      appendMessage('bot', prompt);
      const actionWrap = document.createElement('div');
      actionWrap.className = 'ahana-chatbot__cta-row';
      const btn = document.createElement('a');
      btn.className = 'primary-btn ahana-chatbot__cta';
      btn.href = 'contact.html';
      btn.textContent = 'Enquire Now';
      actionWrap.appendChild(btn);
      messages.appendChild(actionWrap);
      return;
    }

    if (safeText === 'Admission Enquiry') {
      const prompt = 'You can begin your admission enquiry by sharing your parent and child details, selecting the appropriate program and telling us how you would like the school team to contact you.';
      appendMessage('bot', prompt);
      const actionWrap = document.createElement('div');
      actionWrap.className = 'ahana-chatbot__cta-row';
      const btn = document.createElement('a');
      btn.className = 'primary-btn ahana-chatbot__cta';
      btn.href = 'admissions.html';
      btn.textContent = 'Admission Enquiry';
      actionWrap.appendChild(btn);
      messages.appendChild(actionWrap);
      return;
    }

    if (/(13-36|13 to 36|13–36|13-36 months)/.test(safeText)) {
      appendMessage('bot', '13–36 months → Playgroup / Pre-Nursery');
      return;
    }

    if (/(2.5|2.5-3.5|2.5 to 3.5|2.5–3.5)/.test(safeText)) {
      appendMessage('bot', '2.5–3.5 years → Montessori-1 / Nursery');
      return;
    }

    if (/(3.5|3.5-4.5|3.5 to 4.5|3.5–4.5)/.test(safeText)) {
      appendMessage('bot', '3.5–4.5 years → Montessori-2 / LKG');
      return;
    }

    if (/(4.5|4.5-5.5|4.5 to 5.5|4.5–5.5)/.test(safeText)) {
      appendMessage('bot', '4.5–5.5 years → Montessori-3 / UKG');
      return;
    }

    if (safeText.includes("don't know which program") || safeText.includes("program is right") || safeText.includes("not sure")) {
      appendMessage('bot', 'What is your child’s age?');
      return;
    }

    const answer = answerQuestion(safeText);
    appendMessage('bot', answer);
  }

  launcher.addEventListener('click', function () {
    if (panel.hidden) {
      openPanel();
    } else {
      closePanel();
    }
  });

  closeButton.addEventListener('click', closePanel);

  quickButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      handleQuestion(button.dataset.question, true);
      input.value = '';
      if (panel.hidden) {
        openPanel();
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    handleQuestion(input.value, true);
    input.value = '';
    openPanel();
  });

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !panel.hidden) {
      closePanel();
    }
  });
})();
