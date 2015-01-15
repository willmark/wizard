wizard
======

> Stability - 2 Unstable

Simple wizard container for UI without any dependencies

Usage:
````

<link rel="stylesheet" href="css/b9-wz.css">

<form>
    <div class="b9-wz-container">
        <section class="b9-wz">
            <div class="b9-wz-content">
                 --- step 1 --- 
            </div> <!--b9-wz-content-->
        </section <!--b9-wz-->
        <section class="b9-wz">
            <div class="b9-wz-content">
                 --- step 2 --- 
            </div> <!--b9-wz-content-->
        </section <!--b9-wz-->
        <section class="b9-wz">
            <div class="b9-wz-content">
                 --- step 3 --- 
            </div> <!--b9-wz-content-->
        </section <!--b9-wz-->
    </div <!--b9-wz-container-->
</form>

<script src="js/b9-wz.js"></script>
<script>
    form = document.forms[0]; //get containing form and pass into init
    this['b9-wz'].init(form, function (step, target) {
        console.log('In ' + step + ' for ' + target); //this is the callback handler for any step logic (ie. validation/submit)
    })
</script>
````
