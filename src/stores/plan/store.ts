import {create} from 'zustand';



enum Plan {
    Basic = 'basic',
    Premium = 'premium',
    Mega = 'mega',
}




export type PlanStore = {
    plan: Plan;
    updatePlan: (plan: Plan) => void;
    clearPlan: () => void;
};


export const usePlanStore = create<PlanStore>((set) => ({
    plan: Plan.Basic,
    updatePlan: (plan: Plan) => set({ plan }),
    clearPlan: () => set({ plan: Plan.Basic }),
}));