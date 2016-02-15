/// <reference path="typings/knockout.d.ts"/>

declare var ko: KnockoutStatic;

module demo_02_04 {
    var name = ko.observable('John Papa');
    var id = ko.observable(1);

    var guy = {
        id: id,
        fullName: name
    };

    //var value: string = guy.fullName; // mismatched types
    //var value: string = guy.fullName();
    //console.log(value);
}
