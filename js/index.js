'use strict';

let eventHub = new Vue({
  data: {
    cachedWindow: null
  }
});

let Home = {
  template: '#home-template'
};

let Codeeditor = {
    template: '#codeditor-template'
};


//let Calendar = {template: '#calendar-template', mounted: function mounted() {new Countdown({selector: '#timeLeft', dateEnd: new Date('Dec 1, 2018 18:00:00'), msgPattern: '{days} days, {hours} hours, {minutes} minutes, {seconds} seconds!'});}};

const triggerMouseEvent = function triggerMouseEvent(node, eventType) {
  let clickEvent = document.createEvent('MouseEvents');
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
};



const SITE_CONTENT = [{
  content: 'Im the Code Editor window',
  title: 'Codeeditor',
  id: 'codeeditor',
  isShowing: true,
  comp: Codeeditor
},{
    content: 'Im the home window',
    title: 'Home',
    id: 'home',
    isShowing: true,
    comp: Home
}];
    //{content: 'Im the calendar window', title: 'Calendar', id: 'calendar',isShowing: false, comp: Calendar}];




Vue.component('draggable-window', {
  template: '#draggable-window',
  props: ['id', 'title', 'content'],
  data: {
    draggable: null
  },
  methods: {
    closeWindow: function() {
      eventHub.$emit('close-window', this.$el);
    }
  },
  mounted: function() {
    let id = '#' + this.$el.id;
    let title = this.title;
    let x = 0,
        y = 0;

    if (eventHub.cachedWindow && document.getElementById(eventHub.cachedWindow)) {
      let windowEl = document.getElementById(eventHub.cachedWindow);
      x = windowEl.getBoundingClientRect().left + 15;
      y = windowEl.getBoundingClientRect().top + 15;
    }

    TweenLite.set(id, {
      x: x,
      y: y
    });

    this.draggable = Draggable.create(id, {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: ".restrictor",
      onPress: function() {
        eventHub.$emit('window-focused', title);
      }
    });

    // LOL, "press"
    triggerMouseEvent(this.$el, 'mousedown');
    triggerMouseEvent(this.$el, 'mouseup');

    eventHub.cachedWindow = this.$el.id;
  }
});

new Vue({
  el: '#desktop',
  data: {
    windows: SITE_CONTENT,
    activeWindowTitle: 'Nebulas'
  },
  created: function created() {
    eventHub.$on('close-window', this.closeWindow);
    eventHub.$on('window-focused', this.focusWindow);
  },
  methods: {
    closeWindow: function closeWindow(element) {
      let match = _.find(this.windows, {
        id: element.id
      });
      match.isShowing = false;

      let closedWindowCount = _.chain(this.windows).filter({
        isShowing: false
      }).size().value();

      if (closedWindowCount === SITE_CONTENT.length) {
        this.focusWindow('Home');
      }
    },
    focusWindow: function focusWindow(title) {
      this.activeWindowTitle = title;
    },
    openWindow: function openWindow(category) {
      let match = _.find(this.windows, {
        id: category
      });
      if (match.isShowing) {
        let el = document.getElementById(match.id);
        triggerMouseEvent(el, 'mousedown');
        triggerMouseEvent(el, 'mouseup');
      } else {
        match.isShowing = true;
      }
    }
  }
});



















let instructionsVueInstance = new Vue({
    el: '#instructions',
    data: {
        stepCount: 0,
        welcomeMessage: "Home to Nebulas playground",
        steps: ["Home to Nebulas playground", "Step 1 Create account.", "Step 2 check balance", "Step 3 Send a transaction.", "Step 4 Drink some coffee.", "Step 5 take a break"]
    },

    methods:{
        nextStep: function(){
            this.stepCount = this.stepCount + 1;
            this.welcomeMessage = this.steps[this.stepCount];
            if (this.stepCount == 5){
                this.stepCount = 0
            }},
        backStep: function () {
            this.stepCount = this.stepCount - 1;
            this.welcomeMessage = this.steps[this.stepCount];
            if (this.stepCount == 0){
                this.stepCount = 5
            }
        }}
});




//----------- Using plain javascript for the instructions-----------
//todo: add some pictures into the array: give examples of pressing the button and creating an address. 

var stepCount = 0;
var steps = [
    "Welcome to the Tutorial ",
    "Step 1 Create account." + "<button onclick='createNewAccountFuncNeb()'>" + "Generate Account Neb" + "</button>",
    "Step 2 account Status." + "<button onclick='getAccountStateFuncNeb()'>" + "Account status"+ "</button>",
    "Step 4 Drink some coffee.",
    "Step 5 take a break",
    "Step 6 take a walk"
];

function nextStep() {
    stepCount = stepCount + 1;

    document.getElementById("message").innerHTML = "<h3>" + steps[stepCount] + "</h3>";

    if (stepCount == 6){
        stepCount = 0
    }
}

function backStep() {
    stepCount = stepCount - 1;

    document.getElementById("message").innerHTML = "<h3>" + steps[stepCount] + "</h3>";

    if (stepCount == 0){
        stepCount = 6
    }

}




















