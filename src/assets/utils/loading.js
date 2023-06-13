/**
 * 全局loading加载
 */
import { ElLoading } from "element-plus";
//异步消息处utils
import { delay } from "@/assets/utils/utils";

export let loadingInstance = null;

//开始加载
export async function openLoading(text) {
  loadingInstance = ElLoading.service({
    text: text,
  });
  await delay(100); //延迟
}

//结束加载
export function endLoading() {
    loadingInstance.close();
    loadingInstance = null;
}
