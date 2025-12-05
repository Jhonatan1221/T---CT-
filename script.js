// NotificationCenter Singleton optimizado
const NotificationCenter = (function() {
  let instance;

  function createInstance() {
    const subscribers = [];

    function subscribe(sub) {
      if (!subscribers.includes(sub)) subscribers.push(sub);
    }

    function unsubscribe(sub) {
      const index = subscribers.indexOf(sub);
      if (index > -1) subscribers.splice(index, 1);
    }

    function notify(event) {
      subscribers.forEach(sub => sub.update(event));
    }

    return { subscribe, unsubscribe, notify };
  }

  return {
    getInstance: function() {
      if (!instance) instance = createInstance();
      return instance;
    }
  };
})();

// SubscriberFactory optimizado
function SubscriberFactory() {
  return {
    create: function(type, name) {
      const updates = {
        email: (event) => console.log(name + ' Email:', event),
        log: (event) => console.log(name + ' Log:', event),
        visual: (event) => console.log(name + ' Visual Effect:', event)
      };
      return { update: updates[type] };
    }
  };
}

// Uso final del sistema
const factory = SubscriberFactory();
const emailSub = factory.create('email','Juan');
const logSub = factory.create('log','Sistema');
const visualSub = factory.create('visual','Efecto');

const center = NotificationCenter.getInstance();
center.subscribe(emailSub);
center.subscribe(logSub);
center.subscribe(visualSub);

// Notificación a todos los suscriptores
center.notify('Nueva canción');

