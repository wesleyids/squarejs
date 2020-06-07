(function() {

    var events = {
        CLICK: 'click',
        KEYDOWN: 'keydown'
    };

    // TODO: get image in others sizes
    var attrImageLarge = 'data-image-large';

    var template = 
        '<div class="square-container square-hide">'
            + '<span class="square-close square-alignment">&times;</span>'
            + '<div class="square-content square-alignment">'
                + '<div class="square-prev">&#10092</div>'
                + '<img class="square-viewer">'
                + '<div class="square-next">&#10093;</div>'
            + '</div>'
        + '</div>';

    var viewer = null;

    var options = {};

    var imagesList = [];

    var actualImage;

    var nextImage = null;

    var defaults = {
        
        /**
         * Change modal background color
         * @type {string}
         */
        background: "rgba(0, 0, 0, 0.6)",

        /**
         * Enable image responsive
         * @type {boolean}
         */
        responsive: true,

        /**
         * Max width of the image in modal
         * @type {number}
         */
        width: 800,

        /**
         * Max height of the image in modal
         * @type {number}
         */
        height: 600,

        /**
         * Enable preview controls previous and next
         * @type {boolean}
         */
        controls: true,
        
        /**
         * Enable preloader when request image
         */
        preloader: true,

        /**
         * Enable title image(alt|title)
         * @type {boolean}
         */
        showTitle: true,
        
        /**
         * Enable shortcuts
         * @type {boolean}
         */
        disableShortcuts: false,

        /**
         * Shortcut to close modal
         * @type {string|number}
         */
        close: 'Escape',

        /**
         * Shortcut to next image
         * @type {string|number}
         */
        next: 39,

        /**
         * Shortcut to previous image
         * @type {string|number}
         */
        prev: 37
    };

    this.Square = function(selector) {

        if (arguments[1] && typeof arguments[1] === "object") {
            options = extendDefaults(defaults, arguments[1]);
        }

        this.init(selector);
    }

    Square.prototype.init = function(selector) {
        
        appendViewer(template);

        var elements = getElements(selector);

        if (elements != null && elements.length == 0) {
            return;
        }

        for (var i = 0, total = elements.length; i < total; i++) {

            var element = elements[i];

            element.addEventListener(events.CLICK, this.open);

            var image = {
                original: extracSrc(element),
                large: getAttribute(element, attrImageLarge),
                index: i
            }
            imagesList.push(image);
        }

        addListener(events.CLICK, this.close, '.square-close');

        if (!options.disableShortcuts) {
            addListener(events.KEYDOWN, shortcuts);
        }
        
        loadEvents();
    }

    Square.prototype.open = function(element) {
        var image = extracSrc(element);

        actualImage = image;

        if (image) {
            viewer = getElement(".square-container");
            if (viewer) {
                getElement('.square-viewer').src = image;
                addClass(viewer, 'square-show');
                removeClass(viewer, 'square-hide');
            }
        }
    }
    
    Square.prototype.close = function() {
        close();
    }
    
    Square.prototype.next = function() {
        next();
    }

    Square.prototype.prev = function() {
        prev();
    }

    function loadEvents() {
        addListener(events.CLICK, prev, '.square-prev');
        addListener(events.CLICK, next, '.square-next');
    }

    function close() {
        removeClass(viewer, 'square-show');
        addClass(viewer, 'square-hide');

        // reset
        nextImage = null;
    }

    function next() {
        
        var tmp = nextImage;

        if (nextImage == null) {
            nextImage = getIndexImage();
        }

        tmp = nextImage
        tmp += 1;

        if (imagesList[tmp]) {
            setImageInViewer(imagesList[tmp]);
            nextImage = tmp;
        }
    }

    function prev() {

        var tmp = nextImage;

        if (nextImage == null) {
            nextImage = getIndexImage();
        }

        tmp = nextImage
        tmp -= 1;

        if (imagesList[tmp]) {
            setImageInViewer(imagesList[tmp]);
            nextImage = tmp;
        }
    }

    function setImageInViewer(image) {
        var element = getElement('.square-viewer');
        
        removeClass(element, 'square-fade');
        
        if (element) {
            element.src = image.original;
        }

        addClass(element, 'square-fade');
    }

    function getIndexImage() {
        var index = null;
        for (var i = 0; i < imagesList.length; i++) {
            var image = imagesList[i];
            if (image.original == actualImage) {
                index = i;
            }
        }
        return index;
    }

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    function getElement(selector) {
        if (isEmpty(selector)) {
            throw Error("Selector is empty");
        }
        var element = document.querySelector(selector);
        return element;
    }

    function getElements(selector) {
        if (isEmpty(selector)) {
            throw Error("Selector is empty");
        }
        var element = document.querySelectorAll(selector);
        return element;
    }

    /**
     * Append HTML into document
     * 
     * @param {*} html 
     */
    function append(html) {
        document.body.innerHTML += html;
    }

    function appendViewer(tpl) {
        append(tpl);

        var content   = getElement('.square-content');
        var container = getElement('.square-container');
        addStyle(container, 'background-color', options.background);

        var image = getElement('.square-viewer');

        if (options.responsive) {
            addStyle(content, 'max-width', withPixels(options.width));
            addClass(image, 'square-responsive');
        } else {
            addStyle(image, 'width', withPixels(options.width));
            addStyle(image, 'height', withPixels(options.height));
        }
    }

    function withPixels(value) {
        return value + 'px';
    }

    /**
     * Apply styles to the given element.
     */
    function addStyle(element, property, value) {
        element.style[property] = value;
    }

    /**
     * Add class to the target element.
     */
    function addClass(element, clazz) {
        element.classList.add(clazz);
    }

    /**
     * Remove class to the target element.
     * 
     * @param {*} element 
     * @param {*} clazz 
     */
    function removeClass(element, clazz) {
        element.classList.remove(clazz);
    }

    function isEmpty(value) {
        if (value == null || value == "") {
            return true;
        }
        return false;
    }

    function isNotEmpty(value) {
        return !isEmpty(value);
    }

    function hasClass(element, clazz) {
        var clazzes = element.classList;
        return clazzes.indexOf(clazz) != -1;
    }

    /**
     * Add event listener to the target element.
     */
    function addListener(event, fn, selector) {
        if (isEmpty(selector)) {
            document.addEventListener(event, fn);
        } else {
            var element = getElement(selector);
            element.addEventListener(event, fn);
        }
    }

    function extracSrc(element) {
        var src;

        if (typeof element === 'string') {
            return element;
        }

        if (element.target) {
            src = element.target.src;
        } else {
            src = element.src;
        }
        return src;
    }

    function shortcuts(event) {

        if (isNumber(options.close)) {
            if (event.keyCode == options.close) {
                close();
                return;
            }
        }

        if (isString(options.close)) {
            if (event.code == options.close) {
                close();
                return;
            }
        }

        if (isNumber(options.next)) {
            if (event.keyCode == options.next) {
                next();
                return;
            }
        }

        if (isString(options.next)) {
            if (event.code == options.next) {
                next();
                return;
            }
        }

        if (isNumber(options.prev)) {
            if (event.keyCode == options.prev) {
                prev();
                return;
            }
        }

        if (isString(options.prev)) {
            if (event.code == options.prev) {
                prev();
                return;
            }
        }
    }

    function isNumber(value) {
        return typeof value === 'number';
    }

    function isString(value) {
        return typeof value === 'string';
    }

    function getAttribute(element, attr) {
        if (element) {
            return element.getAttribute(attr);
        }
        return "";
    }

    function isMobile() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];
    
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }

}());