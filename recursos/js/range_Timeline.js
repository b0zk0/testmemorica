//TODO: Modernise and use babel
//TODO: Add presence checks to required parameters
//TODO: Add property definitions and make defaults clearer
//TODO HIGH: Support minus values
//TODO HIGH: Figure out step functionality

//Movement Events
/**
 * Calculate move distance for jsValueSliderHandle instance based on mouse distance from slider handle.
 * @param e The click/touch event
 * @param handle The currently clicked/touched handle
 */
//TODO: Add vertical slider logic
function elementDrag(e, handle) {
    e.preventDefault();
    // calculate the new cursor position:
  
    //get handle position and calculate it's center
    var rect = handle.elem.getBoundingClientRect();
    var center = rect.left + (rect.right - rect.left) / 2;
  
    //get user's mouse position relative to the center of the handle
    var clientX = 0;
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    var relMousePos = clientX - center;
    //calculate how many steps to move based on the distance between the mouse and the center of the handle
    var steps = relMousePos / handle.slider.pixelPointDistance / handle.step;
    handle.move(Math.round(steps));
  }
  
  /**
     * Destroy mouse move and touch move events for handle
     * @param e The click/touch event
     * @param handle The currently clicked/touched handle
     */
  function closeDragElement(e, handle) {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
  
  /**
     * Register mouse move and touch move events for handle
     * @param e The click/touch event
     * @param handle The currently clicked/touched handle
     */
  function dragMouseDown(e, handle) {
    e.preventDefault();
    document.onmouseup = function (e) {
      closeDragElement(e, handle);
    };
    document.ontouchend = function (e) {
      closeDragElement(e, handle);
    };
    // call a function whenever the cursor moves:
    document.onmousemove = function (e) {
      elementDrag(e, handle);
    };
    document.ontouchmove = function (e) {
      elementDrag(e, handle);
    };
  }
  //End Movement Events
  
  //Slider Static Functions
  var sliders = {}; //Array to store all slider instances.
  window.onresize = function () {
    for (var i in sliders) {
      if (sliders.hasOwnProperty(i)) {
        sliders[i].calculatePixelPointDistance();
        sliders[i].setPositions();
        sliders[i].handles.forEach(function (handle) {
          handle.updatePixelPosition();
          handle.labels.forEach(function (label) {
            label.updatePosition(label.position.value);
          });
        });
      }
    }
  };
  
  
  /**
      * Return a jsValueSlider based on the slider's DOM id
      * @param id DOM id of slider
      * @returns jsValueSlider
      */
  function getjsValueSliderById(id)
  {
    if (sliders.hasOwnProperty(id)) {
      return sliders[id];
    }
    return null;
  }
  
  function buildJsValueSliders(data)
  {
    if (data.hasOwnProperty('sliders')) {
      data.sliders.forEach(function (slider) {
        if (slider.hasOwnProperty('slider')) {
          var currSlider = new jsValueSlider(
          slider.slider,
          slider.min,
          slider.max,
          slider.step);
  
          if (slider.hasOwnProperty('handles')) {
            slider.handles.forEach(function (handle) {
              var currHandle = new jsValueSliderHandle(
              currSlider,
              handle.min,
              handle.max,
              handle.step,
              handle.currPos,
              handle.elem);
  
              if (handle.hasOwnProperty('labels')) {
                handle.labels.forEach(function (label) {
                  new jsValueSliderLabel(
                  currSlider,
                  currHandle,
                  label.position,
                  label.content,
                  label.elem);
  
                });
              }
              if (handle.hasOwnProperty('outputs')) {
                handle.outputs.forEach(function (output) {
                  new jsValueSliderOutput(
                  currSlider,
                  currHandle,
                  output.elem);
  
                });
              }
  
  
  
  
  
  
  
            });
          }
        }
      });
    }
  }
  
  function buildJsValueSliderFromRangeInput(elem, id, orientation)
  {
    if (typeof elem === 'string') {
      elem = document.querySelector(elem);
    }
    var sliderContainer = document.createElement('div');
    sliderContainer.classList.add('js_value_slider_container');
    //TODO: Add support for vertical sliders
    //var orientationClass = orientation === 'vertical' ? js_value_slider_vertical : js_value_slider_horizontal;
    //sliderContainer.classList.add(orientationClass);
    sliderContainer.classList.add('js_value_slider_horizontal');
    var sliderElem = document.createElement('div');
    sliderElem.classList.add('js_value_slider');
    sliderElem.id = elem.id;
    sliderContainer.appendChild(sliderElem);
    var sliderBar = document.createElement('div');
    sliderBar.classList.add('js_value_slider_bar');
    sliderElem.appendChild(sliderBar);
    var sliderScale = document.createElement('div');
    sliderScale.classList.add('js_value_slider_scale');
    sliderElem.appendChild(sliderScale);
    elem.parentNode.insertBefore(sliderContainer, elem.nextSibling);
    elem.setAttribute('style', 'display:none;');
  
    var slider = new jsValueSlider(
    sliderElem,
    elem.getAttribute('min'),
    elem.getAttribute('max'),
    1);
  
    var handle = new jsValueSliderHandle(
    slider,
    elem.getAttribute('min'),
    elem.getAttribute('max'),
    elem.getAttribute('step'),
    elem.getAttribute('value'));
  
    handle.registerMoveListener(function (e) {
      elem.setAttribute('value', handle.currPos);
    });
    var labels = document.querySelectorAll('label[for="' + elem + '"]');
  
    return slider;
  }
  //End Slider Static Functions
  
  //Slider Class
  /**
   * jsValueSlider Class
   * @param elem The DOM element the slider is bound to
   * @param min Minimum value of slider positions
   * @param max Maximum value of slider positions
   * @param step How many values the slider increments/decrements by at once.
   */
  jsValueSlider = function (elem, min, max, step) {
    this.elem = elem;
    if (typeof this.elem === 'string') {
      this.elem = document.querySelector(this.elem);
    }
    this.min = typeof min === 'undefined' ? 1 : parseInt(min);
    this.max = typeof max === 'undefined' ? 100 : parseInt(max);
    this.step = typeof step === 'undefined' ? 1 : parseInt(step);
    this.handles = [];
  
    this.calculatePixelPointDistance();
    this.setPositions();
  
    sliders[this.elem.id] = this;
  };
  
  jsValueSlider.prototype.calculatePixelPointDistance = function ()
  {
  
    var sliderPixelWidth = this.elem.querySelector('.js_value_slider_scale').clientWidth;
    this.pixelPointDistance = sliderPixelWidth / (this.max - this.min);
  };
  
  jsValueSlider.prototype.setPositions = function ()
  {
    this.positions = {};
    new jsValueSliderPosition(this, this.min, 0);
    var currPixelPos = 0;
    for (var i = this.min + this.step; i <= this.max; i = i + this.step) {
      currPixelPos += this.pixelPointDistance * this.step;
      new jsValueSliderPosition(this, i, currPixelPos);
    }
    if (typeof this.positions[this.max] === 'undefined') {
      var maxPixelPos = this.pixelPointDistance * (this.max - this.min);
      new jsValueSliderPosition(this, this.max, maxPixelPos);
    }
  };
  
  jsValueSlider.prototype.getAllValues = function ()
  {
    var values = [];
    this.handles.forEach(function (handle) {
      values.push(parseInt(handle.currPos));
    });
    return values;
  };
  //End Slider Class
  
  //Slider Position Class
  /**
   * jsValueSliderPosition Class - Represents a "position"/"Pixel Position" for each slider value.
   * @param slider
   * @param value
   * @param pixelPos
   */
  jsValueSliderPosition = function (slider, value, pixelPos) {
    this.slider = slider;
    this.slider.positions[value] = this;
    this.value = value;
    this.pixelPos = typeof pixelPos === 'undefined' ? 0 : pixelPos;
    this.labels = [];
  };
  //End Slider Position Class
  
  //Slider Handle Class
  /**
   * jsValueSliderHandle Class - Represents a "handle" which the user moves to modify it's value
   * @param slider
   * @param min
   * @param max
   * @param step
   * @param currPos
   * @param elem
   */
  jsValueSliderHandle = function (slider, min, max, step, currPos, elem) {
    this.slider = slider;
    this.slider.handles.push(this);
    this.min = typeof min === 'undefined' ? this.slider.min : parseInt(min);
    this.max = typeof max === 'undefined' ? this.slider.max : parseInt(max);
    this.step = typeof step === 'undefined' ? this.slider.step : parseInt(step);
    this.events = [];
    //handle step must be either
    if (this.step % this.slider.step !== 0) {
      this.step = this.slider.step * this.step;
    }
    if (this.step > this.max - this.min) {
      this.step = this.max - this.min;
    }
    this.currPos = typeof currPos === 'undefined' ? this.min : currPos;
    this.labels = [];
    this.outputs = [];
    this.elem = typeof elem === 'undefined' ? null : elem;
    if (typeof elem === 'string') {
      this.elem = this.slider.elem.querySelector(elem);
    }
    if (this.elem === null) {
      this.elem = document.createElement('div');
      this.elem.classList.add('js_value_slider_handle');
    }
    var handleHolder = this.slider.elem.querySelector('.js_value_slider_handle_holder');
    if (handleHolder === null) {
      handleHolder = document.createElement('div');
      handleHolder.classList.add('js_value_slider_handle_holder');
      this.slider.elem.appendChild(handleHolder);
    }
    handleHolder.appendChild(this.elem);
  
    var currHandle = this;
    this.elem.onmousedown = function (e) {
      dragMouseDown(e, currHandle);
    };
    this.elem.ontouchstart = function (e) {
      dragMouseDown(e, currHandle);
    };
  
    this.updatePosition(this.currPos);
  };
  
  /**
      * Calculate handle position based on "steps" and update
      * @param steps signed integer representing the number of values to move
      *        negative = left/down, positive = right/up.
      */
  jsValueSliderHandle.prototype.move = function (steps) {
    steps = typeof steps === 'undefined' ? 1 : steps;
    var currentPosition = this.slider.positions[this.currPos];
    var possiblePositions = Object.keys(this.slider.positions);
    var desiredPositionKey = possiblePositions.indexOf(String(this.currPos)) + steps * this.step;
    if (desiredPositionKey > possiblePositions.length - 1) {
      desiredPositionKey = possiblePositions.length - 1;
    } else if (desiredPositionKey < 0) {
      desiredPositionKey = 0;
    }
    var desiredPosition = possiblePositions[desiredPositionKey];
    currPos = this.slider.positions[desiredPosition].value;
    this.updatePosition(currPos);
  };
  
  /**
      * Update handle position by setting the "left" style attribute of the handle.
      * @param currPos
      */
  jsValueSliderHandle.prototype.updatePosition = function (currPos) {
    if (currPos > this.max) {
      currPos = this.max;
    }
    if (currPos < this.min) {
      currPos = this.min;
    }
    this.currPos = parseInt(currPos);
    this.updatePixelPosition();
    var currHandle = this;
    this.outputs.forEach(function (output) {
      output.elem.innerHTML = currHandle.currPos;
    });
    this.elem.setAttribute('data-text', this.currPos);
    // this.elem.setAttribute('placeholder', this.currPos);
  };
  
  jsValueSliderHandle.prototype.updatePixelPosition = function () {
    this.pixelPos = this.slider.positions[this.currPos].pixelPos;
    this.elem.style.left = this.pixelPos + 'px';
  };
  
  jsValueSliderHandle.prototype.registerEventListener = function (type, callback) {
    this.elem.addEventListener('mousedown', function (e) {
      document.addEventListener(type, callback);
    });
    this.elem.addEventListener('touchstart', function (e) {
      document.addEventListener(type, callback);
    });
  };
  
  jsValueSliderHandle.prototype.registerMoveListener = function (callback) {
    this.elem.addEventListener('mousedown', function (e) {
      document.addEventListener('mousemove', callback);
      document.addEventListener('mouseup', function a(e) {
        document.removeEventListener('mousemove', callback);
        document.removeEventListener('mouseup', a);
      });
    });
    this.elem.addEventListener('touchstart', function (e) {
      document.addEventListener('touchmove', callback);
      document.addEventListener('touchend', function b(e) {
        document.removeEventListener('touchmove', callback);
        document.removeEventListener('touchend', b);
      });
    });
  };
  //End Slider Handle Class
  
  //Slider Label Class
  /**
   * jsValueSliderLabel Class - Represent a "label" relative to a position.
   * Current behaviour: Update handle position to label "onclick", show content
   * @param slider jsValueSlider
   * @param handle jsValueSliderHandle
   * @param position int
   * @param content string
   * @param elem
   */
  jsValueSliderLabel = function (slider, handle, position, content, elem) {
    this.slider = slider;
    this.handle = handle;
    this.position = this.slider.positions[position];
    this.position.labels.push(this);
    if (typeof elem !== 'undefined') {
      this.elem = elem;
      if (typeof this.elem === 'string') {
        this.elem = document.querySelector(this.elem);
      }
      this.addData(content);
    } else {
      this.elem = document.createElement('div');
      this.elem.classList.add('js_value_slider_label');
      this.addData(content);
      var labelHolder = this.position.slider.elem.querySelector('.js_value_slider_label_holder');
      if (labelHolder === null) {
        labelHolder = document.createElement('div');
        labelHolder.classList.add('js_value_slider_label_holder');
        this.position.slider.elem.appendChild(labelHolder);
      }
      labelHolder.appendChild(this.elem);
    }
    this.handle.labels.push(this);
  };
  
  /**
      * Attempt to solve problem of adding all relevant data before instance is rendered to DOM
      * @param content
      */
  //Refactor: Improve code smell.
  jsValueSliderLabel.prototype.addData = function (content) {
    this.addContent(content);
    this.elem.setAttribute('data-pos', this.position.value);
    this.updatePosition(this.position.value);
    var currHandle = this.handle;
    this.elem.onclick = function (e) {
      currHandle.updatePosition(this.getAttribute('data-pos'));
    };
  };
  
  jsValueSliderLabel.prototype.updatePosition = function (currPos) {
    this.position = this.slider.positions[currPos];
    this.elem.style.left = this.position.pixelPos + 'px';
  };
  
  /**
      * Add label content.
      * @param content
      */
  jsValueSliderLabel.prototype.addContent = function (content) {
    content = typeof content === 'undefined' ? '' : content;
    var contentHolder = document.createElement('div');
    contentHolder.innerHTML = content;
    this.content = contentHolder;
    this.elem.appendChild(this.content);
  };
  //End Slider Label Class
  
  //Slider Output Class
  /**
   * jsValueSliderOutput Class - Represents DOM element where handle value should be displayed.
   * @param slider jsValueSlider
   * @param handle jsValueSliderHandle
   * @param elem
   */
  jsValueSliderOutput = function (slider, handle, elem) {
    this.slider = slider;
    this.handle = handle;
    this.handle.outputs.push(this);
    this.elem = elem;
    if (typeof this.elem === 'string') {
      this.elem = document.querySelector(this.elem);
    }
    this.elem.innerHTML =  '<input type="number" placeholder="' + this.handle.currPos + '">';
  };
  //End Slider Output Class
  
  document.addEventListener("DOMContentLoaded", function (event) {
    buildJsValueSliders({
      'sliders': [
      {
        'slider': '.js_value_slider',
        'step': 1,
        'min': 1000,
        'max': 2000,
        'handles': [
        {
          'step': 1,
          'min': 1000,
          'currPos': 1250,
          'labels': [
          {
            'position': 1000,
            'content': '<b>Label 1</b><br >1000' },
  
          {
            'position': 1500,
            'content': '<b>Label 2</b><br >1500' }],
  
  
          'outputs': [
          {
            'elem': '.js_value_slider_output' }] },
  
  
  
        {
          'step': 1,
          'max': 2000,
          'currPos': 1750,
          'labels': [
          {
            'position': 2000,
            'content': '<b>Label 3</b><br >2000' }],
  
  
          'outputs': [
          {
            'elem': '.js_value_slider_output2' }] }] }] });
  
  
  
  
  
  
  
  
  
    function showSliderDifference(slider)
    {
      var values = slider.getAllValues();
      var valMax = Math.max.apply(null, values);
      var difference = valMax;
      values.forEach(function (value) {
        difference -= value;
      });
      difference += valMax;
  
      document.querySelector('.js_value_slider_range_output').innerHTML = difference;
    }
  
    var slider = getjsValueSliderById('js_value_slider');
    showSliderDifference(slider);
    slider.handles.forEach(function (handle) {
      handle.registerMoveListener(function (e) {
        showSliderDifference(slider);
      });
    });
    var handle1 = slider.handles[0];
    var handle2 = slider.handles[1];
    handle1.registerMoveListener(function (e) {
      handle1.max = handle2.currPos - 1;
    });
    handle2.registerMoveListener(function (e) {
      handle2.min = handle1.currPos + 1;
    });
  
    buildJsValueSliderFromRangeInput('#js_value_slider2');
  });
  