/**
 * Conditionally account for requirejs if available
 */
;
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        //define this file as a named AMD module
        define(['domReady!'], factory)
    } else {
        //use the global space and set this module there

        //emulate requirejs in a simplified way for getting modules
        global.require = function (name, deps, cb) {
            if (typeof name === 'string') {
                return global[name];
            }
        }
        global['b9-wz'] = factory(global.document)
    }
}(this, function (domReady, angularSanitize, angular, Crud, organizationDetail) {
    //module will just enclose the entire module in a local scoped variable which will be returned
    //for inclusion in the containing module
    var module = {
        init: function (element, callback) {
            var nextLabel = "Next";
            var prevLabel = "Back";
            var finishLabel = "Finish";
            var pageVisible = 'b9-wz-visible';
            var currentTarget = {};

            /**
            * unique target id generator
            */
            var hash = function () {
                   var id = []
                    for (var i=0;i<24;i++) {
                        id.push((Math.floor(Math.random()*16) % 16).toString(16))
                    }
                    return id.join('')
            }

            /**
            * Create target id's for each section
            */
            var wizards = element.getElementsByClassName('b9-wz');
            var elements = Array.prototype.forEach.call(wizards, function (wizardElement, index, arr) {
                hashval = hash()
                wizardElement.setAttribute('id', 'b9-wz' + hashval);
                if (index === 0) {
                    wizardElement.className = wizardElement.className + ' ' + pageVisible;
                    currentTarget = wizardElement;
                }
            });

            /**
            * Advance to the next wizard panel
            */
            function moveNext() {
                currentTarget.className = currentTarget.className.replace(pageVisible, '') || currentTarget.className;
                if (currentTarget.nextElementSibling !== null) {
                   currentTarget = currentTarget.nextElementSibling;
                   currentTarget.className = currentTarget.className + ' ' + pageVisible;
                }
                return currentTarget.nextElementSibling;
            }

            /**
            * Move to previous wizard panel
            */
            function movePrev() {
                currentTarget.className = currentTarget.className.replace(pageVisible, '') || currentTarget.className;
                if (currentTarget.previousElementSibling !== null) {
                   currentTarget = currentTarget.previousElementSibling;
                   currentTarget.className = currentTarget.className + ' ' + pageVisible;
                }
                return currentTarget.previousElementSibling;
            }

            /**
            * User clicks enter key.  Either advance to next panel, or submit final changes
            */
            element.onsubmit = function (event) {
                if (currentTarget.nextElementSibling !== null) {
                 if (!moveNext()) {
                   callback('finish', currentTarget);
                 } else {
                   callback('next', currentTarget);
                 }
                }
            }

            /**
             * Now get the links, and handle the click :target handling
             */
            var elements = Array.prototype.forEach.call(wizards, function (wizardElement, index, arr) {
                var next = '';
                if (index < arr.length - 2) {
                    next = '<li><a href="#' +  arr[index+1].getAttribute('id') + '" b9-wz-button="next" class="b9-wz-link">' + nextLabel + '</a></li>'
                } else if (index < arr.length -1) {
                    next = '<li><a href="#' +  arr[index+1].getAttribute('id') + '" b9-wz-button="finish" class="b9-wz-link">' + finishLabel + '</a></li>'; 
                    wizardElement.className = wizardElement.className + ' b9-wz-finish';
                }
                var prev = '';
                if (index > 0) {
                    prev = '<li><a href="#' +  arr[index-1].getAttribute('id') + '" b9-wz-button="prev" class="b9-wz-link">' + prevLabel + '</a></li>';
                }

                var links = document.createElement('div');
                var wizardLinks = '<ul>' + prev + next + '</ul>';
                links.innerHTML = wizardLinks;
                links.className = links.className + ' b9-wz-links';
                wizardElement.appendChild(links);
                wizardElement.onclick = function (event) {
                    var task = event.target.getAttribute('b9-wz-button');
                    switch (task) {
                    case 'next':
                    case 'finish':
                        moveNext();
                        callback(task, currentTarget);
                        break;
                    case 'prev':
                        movePrev();
                        callback(task, currentTarget);
                        break;
                    }
                    event.preventDefault();
                    !element.validate || element.validate();
                }
            });
        }
    }

    return module
}))
