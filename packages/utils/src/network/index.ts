import { bool } from "@memo28/types";

export interface networkTarget {
  /**
   * 下行速度。越大网络越快 越小网络越慢
   */
  downlink: number;
  /**
   * 检测判断
   */
  effectiveType: string;
  /**
   * 链接往返时间 该值越大 表示网络越慢
   */
  rtt: number;
  saveData: boolean;
}

export interface detectNetworkSpeedPromptsOptions {
  /**
   * 仅提示 不需要携带网络参数的提示
   */
  onlyHint: bool;
  /**
   * 携带网络参数的提示
   */
  onlyHintAll: boolean;
}


export function detectNetworkSpeedPrompts(target: networkTarget, opt?: detectNetworkSpeedPromptsOptions): string {
  const det = `rtt:${target.rtt},downLink:${target.downlink}`;
  const { rtt, downlink, effectiveType } = target;

  if (rtt < 150 && downlink > 5) {
    if (opt?.onlyHint) return "超高速网络！尽情冲浪吧～";
    return `超高速网络！尽情冲浪吧～ 网络类型：${effectiveType},${det}`;
  }
  if (rtt >= 150 && rtt < 300 && downlink > 2) {
    if (opt?.onlyHint) return "网络良好，体验流畅～";
    return `网络良好，体验流畅～ 网络类型：${effectiveType},${det}`;
  }
  if (rtt >= 300 && rtt < 500 && downlink > 1) {
    if (opt?.onlyHint) return "有些慢了，可能需要稍等～";
    return `有些慢了，可能需要稍等～ 网络类型：${effectiveType},${det}`;
  }
  if (rtt >= 500 && rtt < 800 && downlink > 0.5) {
    if (opt?.onlyHint) return "网络较慢，加载可能需要一会儿～";
    return `网络较慢，加载可能需要一会儿～ 网络类型：${effectiveType},${det}`;
  }
  if (rtt >= 800 || downlink < 0.5) {
    if (opt?.onlyHint) return "网络非常慢，请耐心等待或尝试切换网络～";
    return `网络非常慢，请耐心等待或尝试切换网络～ 网络类型：${effectiveType},${det}`;
  }
  return `网络状态无法确定，请检查连接～`;
}

