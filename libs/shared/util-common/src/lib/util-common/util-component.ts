import { inject, ChangeDetectorRef, ViewRef } from '@angular/core';
import { Subject } from 'rxjs';

export const ondestroy$ = (): Subject<void> => {
     const destroy$ = new Subject<void>();
     const viewRef = inject(ChangeDetectorRef) as ViewRef;

     viewRef.onDestroy(() => {
          destroy$.next();
          destroy$.complete();
     });
     return destroy$;
};
