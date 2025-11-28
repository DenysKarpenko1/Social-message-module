import '../css/styles.css';

export class SocialWidget {
  constructor(config) {
    this.config = config;
    this.container = null;
    this.closedCount = 0;

    this.intervalId = null;
    this.timeoutIds = []; 
    
    this.attempts = 0;

    this.initAsync();
  }

  initAsync() {
    this.intervalId = setInterval(() => {
      this.attempts++;
      const anchor = this.findAnchor(this.config.selectors);

      if (anchor) {
        this.stopPolling(); 
        this.anchorPoint = anchor;
        this.render();
      } else if (this.attempts * this.config.settings.checkInterval > this.config.settings.timeout) {
        console.warn('SocialWidget: Timeout. Element not found.');
        this.stopPolling(); 
      }
    }, this.config.settings.checkInterval);
  }

  stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  destroy() {
    this.stopPolling();
    this.timeoutIds.forEach(id => clearTimeout(id));
    if (this.container) {
      this.container.remove(); 
    }
  }

  findAnchor(selectors) {
    for (let sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  }

  render() {
    this.container = document.createElement('div');
    this.container.className = 'social-widget-container';
    
    if (this.config.settings.position === 'append') {
        this.anchorPoint.appendChild(this.container);
    } else if (this.config.settings.position === 'after') {
        this.anchorPoint.parentNode.insertBefore(this.container, this.anchorPoint.nextSibling);
    } else {
        this.anchorPoint.parentNode.insertBefore(this.container, this.anchorPoint);
    }

    this.startSequence();
  }

  startSequence() {
    this.container.innerHTML = ''; 
    this.closedCount = 0;

    if (this.config.messages[0]) {
        this.createMessage(this.config.messages[0]);
    }

    if (this.config.messages[1]) {
        const id = setTimeout(() => {
          this.createMessage(this.config.messages[1]);
        }, this.config.settings.messageDelay);
        this.timeoutIds.push(id);
    }
  }

  createMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'social-msg';
    msg.innerHTML = `
      <b>${this.config.ui.title}</b> ${text}
      <div class="social-msg-close">${this.config.ui.closeBtn}</div>
    `;

    const closeBtn = msg.querySelector('.social-msg-close');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      msg.style.opacity = '0';
      
      const id = setTimeout(() => msg.remove(), this.config.settings.animationDuration);
      this.timeoutIds.push(id);
      
      this.handleClose();
    });

    this.container.appendChild(msg);

    setTimeout(() => {
        msg.classList.add('visible');
    }, 50);
  }

  handleClose() {
    this.closedCount++;
    if (this.closedCount >= this.config.messages.length) {
      const id = setTimeout(() => this.showDetailsLink(), this.config.settings.animationDuration);
      this.timeoutIds.push(id);
    }
  }

  showDetailsLink() {
    const link = document.createElement('span');
    link.className = 'social-details-link';
    link.innerText = this.config.ui.detailsLink; 
    link.addEventListener('click', () => this.startSequence());
    this.container.appendChild(link);
  }
}