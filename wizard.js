var nextLabel = "Next";
var backLabel = "Back";
var finishLabel = "Finish";

var wizardBack = function(index) {
    if (index > 0) {
        return '<li><a href="#wizard' + (index - 1) + '">' + backLabel + '</a></li>';
    } else {
        return '';
    }
}

var wizardNext = function(index, lastIndex) {
    if (index === lastIndex - 1) {
        return '<li><a href="#wizard' + (index + 1) + '">' + finishLabel + '</a></li>';
    } else if (index < lastIndex) {
        return '<li><a href="#wizard' + (index + 1) + '">' + nextLabel + '</a></li>';
    } else {
        return ''
    }
}

var idx = 0;
var wizards = document.getElementsByClassName('wizard');
var elements = Array.prototype.forEach.call(wizards, function(wizardElement, index, arr){
     wizardElement.setAttribute('id', 'wizard' + index);
     var links = document.createElement('div');
     var wizardLinks = '<ul>' + wizardBack(index) + wizardNext(index, arr.length-1) + '</ul>';
     links.innerHTML = wizardLinks;
     links.className = links.className + ' wizard-links';
     wizardElement.appendChild(links);
});
