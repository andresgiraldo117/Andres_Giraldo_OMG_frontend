<script>
import {
    layoutComputed
} from "@/state/helpers";
import Horizontal from "./horizontal";

export default {
    components: {
        Horizontal,
    },
    data() {
        return {};
    },
    computed: {
        ...layoutComputed,
    },
};
</script>

<template>
<div>
    <Horizontal :layout="layoutType">
        <slot />
    </Horizontal>
</div>
</template>
