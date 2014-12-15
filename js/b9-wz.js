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
        init: function () {
            var nextLabel = "Next";
            var backLabel = "Back";
            var finishLabel = "Finish";

            var wizardBack = function (index) {
                if (index > 0) {
                    return '<li><a href="#b9-wz' + (index - 1) + '" class="b9-wz-link">' + backLabel + '</a></li>';
                } else {
                    return '';
                }
            }

            var wizardNext = function (index, lastIndex) {
                if (index === lastIndex - 1) {
                    return '<li><a href="#b9-wz' + (index + 1) + '" class="b9-wz-link">' + finishLabel + '</a></li>';
                } else if (index < lastIndex) {
                    return '<li><a href="#b9-wz' + (index + 1) + '" class="b9-wz-link">' + nextLabel + '</a></li>';
                } else {
                    return ''
                }
            }

            var idx = 0;
            var pageVisible = 'b9-wz-visible';
            var currentTarget = {};
            var wizards = document.getElementsByClassName('b9-wz');
            var elements = Array.prototype.forEach.call(wizards, function (wizardElement, index, arr) {
                wizardElement.setAttribute('id', 'b9-wz' + index);
                if (index === 0) {
                    wizardElement.className = wizardElement.className + ' ' + pageVisible;
                    currentTarget = wizardElement;
                }
                var links = document.createElement('div');
                var wizardLinks = '<ul>' + wizardBack(index) + wizardNext(index, arr.length - 1) + '</ul>';
                links.innerHTML = wizardLinks;
                links.className = links.className + ' b9-wz-links';
                wizardElement.appendChild(links);
            });

            /**
             * Now get the links, and handle the click :target handling
             */
            var wizards = document.getElementsByClassName('b9-wz-link');
            var elements = Array.prototype.forEach.call(wizards, function (wizardElement, index, arr) {
                wizardElement.onclick = function (event) {
                    var targetId = event.srcElement.hash.substr(1);
                    currentTarget.className = currentTarget.className.replace(pageVisible, '') || currentTarget.className;
                    currentTarget = document.getElementById(targetId);
                    currentTarget.className = currentTarget.className + ' ' + pageVisible;
                    event.preventDefault();
                }
            });
        }
    }

    return module
}))
