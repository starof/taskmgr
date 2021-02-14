import { trigger, state, transition, style, animate, query, animation, stagger } from '@angular/animations';

export const listAnimation = trigger('listAnim', [
    transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }), //加入optional为true,后面的状态动画都是可选的
        query(':enter', stagger(1000, [
            animate('1s', style({ opacity: 1 }))
        ]), { optional: true }),
        query(':leave', style({ opacity: 1 }), { optional: true }),
        query(':leave', stagger(1000, [
            animate('1s', style({ opacity: 0 }))
        ]), { optional: true })
    ])
]);