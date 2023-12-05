import { fetchClientActionsService } from '@/services/control/Controll';
import { defineStore } from 'pinia';

export const useControlStore = defineStore({
    id: 'control',

    state: () => ({
        controlForAccount: [] as any,
        hasNextPage: false as any,
        endCursor: '' as any
    }),

    actions: {
        async getControlForAccount({ clientId = '', first = 10 }, after?: string) {
            try {
                const { data } = await fetchClientActionsService({ clientId , first }, after);
                if (!this.hasNextPage) this.controlForAccount = data.events.edges
                else {
                    this.controlForAccount.push(...data.events.edges)
                }
                this.hasNextPage = data.events.pageInfo.hasNextPage;
                this.endCursor = data.events.pageInfo.endCursor;
            } catch (error) {
                console.log(error)
    
            }
        },
    }
})