# Mini proyecto: Patrones de Diseño en Javascript con IA

**Autor:** Jonathan  
**Objetivo:** Demostrar pensamiento creativo aumentado por IA aplicando patrones de diseño (Observer, Factory, Singleton) en Javascript.

---

## Resumen ejecutivo
Este proyecto muestra cómo usar IA para generar ideas divergentes, romper prácticas estándar, revisar y optimizar código, y producir un recurso visual que explique la solución. Todo se basa en patrones de diseño combinados: Observer, Factory y Singleton.

---

## Fase 1 — Identificación y pensamiento divergente

**Concepto JS elegido:** Patrones de diseño (Observer, Factory, Singleton).  
**Dificultad personal:** Aplicar múltiples patrones de diseño al mismo tiempo, gestionando eventos, instancias únicas y creación de objetos dinámicamente.

**Idea creativa (tema no relacionado — música):**
- Sistema de notificaciones musicales donde distintas aplicaciones o módulos reaccionan a cambios en las canciones (Observer).
- Todos los suscriptores se crean mediante una Factory (EmailSubscriber, LogSubscriber, VisualEffectSubscriber).
- NotificationCenter como Singleton que centraliza las notificaciones.

**Prompt enviado a la IA (Fase 1):**  
> \"Dame ideas originales para usar Observer, Factory y Singleton juntos en Javascript, con un tema no relacionado como música. Sugiere al menos un snippet conceptual y analogía visual.\"

**Respuesta resumida:**  
IA propuso un NotificationCenter que notifica a distintos tipos de suscriptores musicales, con Factory para crear suscriptores dinámicamente y Singleton para el centro de notificaciones. Analógico: cada instrumento de una banda representa un suscriptor que recibe las señales del director (NotificationCenter).


// NotificationCenter Singleton usando closures y funciones
const NotificationCenter = (function() {
  let instance;

  function createInstance() {
    const subscribers = [];
    return {
      subscribe: function(sub) { subscribers.push(sub); },
      notify: function(event) { 
        subscribers.forEach(sub => sub.update(event)); 
      }
    };
  }

  return {
    getInstance: function() {
      if (!instance) instance = createInstance();
      return instance;
    }
  };
})();

// SubscriberFactory para crear distintos tipos de suscriptores
function SubscriberFactory() {
  return {
    create: function(type, name) {
      if (type === 'email') return { update: (event) => console.log(name + ' Email:', event) };
      if (type === 'log') return { update: (event) => console.log(name + ' Log:', event) };
      if (type === 'visual') return { update: (event) => console.log(name + ' Visual Effect:', event) };
    }
  };
}

// Ejemplo de uso inicial
const factory = SubscriberFactory();
const emailSub = factory.create('email','Juan');
const logSub = factory.create('log','Sistema');
const center = NotificationCenter.getInstance();

center.subscribe(emailSub);
center.subscribe(logSub);
center.notify('Nueva canción');


🔹 Observaciones de la IA

Legibilidad: separar funciones internas para que subscribe, unsubscribe y notify sean claras.

Posibles bugs: manejar duplicados de suscriptores y asegurar que el final callback se llame solo una vez si hubiera eventos asíncronos (aunque aquí no usamos async).

Optimización 1: agregar método unsubscribe para mayor flexibilidad.

Optimización 2: evitar duplicados de suscriptores en la lista.

🔹 Código final con optimizaciones
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

🔹 Mejoras implementadas

unsubscribe permite quitar suscriptores.

Chequeo de duplicados evita que un mismo suscriptor reciba notificaciones más de una vez.

Funciones internas separadas mejoran claridad y legibilidad


<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/012128de-2e1d-492d-acdc-20c0d9d1e0a5" />
