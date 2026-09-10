import {
    r as n
} from "./portal-client-CV1s4BnW.js";
import {
    gn as r
} from "./index-dGs9i_Jo.js";
import {
    n as o,
    r as s
} from "./ui-snapshot-D_gTOR2w.js";
import {
    t as c
} from "./account-switch-pending-DkWZQje_.js";

function p() {
    const {
        data: e
    } = r({
        queryKey: ["auth-uid"],
        queryFn: async () => (await n.auth.getUser()).data.user ? .id ? ? null,
        staleTime: 1 / 0
    }), {
        data: a
    } = r({
        queryKey: ["active-kind", e],
        enabled: !!e,
        refetchInterval: 2e3,
        placeholderData: () => o("active-kind", e),
        queryFn: async () => {
            const {
                data: i
            } = await n.from("profiles").select("active_account").eq("id", e).maybeSingle(), t = c(i ? .active_account ? ? "demo");
            return s("active-kind", e, t), t
        }
    });
    return {
        userId: e ? ? null,
        kind: a ? ? "demo",
        ready: !!e && a != null
    }
}
export {
    p as t
};