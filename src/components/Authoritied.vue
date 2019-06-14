<script>
/// 权限控制函数式组件
import { checkAuthority } from "../utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    return checkAuthority(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
