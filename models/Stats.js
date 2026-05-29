import FileSystem from "fs";
import env from "../helpers/config.js";
import os from "os";
import { toMB_KB, getCpuUsagePercent } from "../helpers/helpers.js";

const Stats = {
    getGeneralStats: () => { },
    get: () => { },
};

Stats.getGeneralStats = async () => {
    var stats = {}

    stats.usedRAM = toMB_KB(process.memoryUsage().rss)
    stats.usedHeapRAM = toMB_KB(process.memoryUsage().heapTotal)
    // stats.env = process.env;
    stats.pid = process.cpuUsage();
    stats.uptime = process.uptime();
    stats.cpu = await getCpuUsagePercent();
    stats.cwd = process.cwd();
    stats.nodeV = process.version;

    stats.os = {}
    stats.os.totalRAM = toMB_KB(os.totalmem());
    stats.os.FreeRAM = toMB_KB(os.freemem());
    stats.os.uptime = os.uptime();
    stats.os.hostname = os.hostname();
    stats.os.loadavg = os.loadavg();
    stats.os.architecture = os.machine();
    stats.os.platform = os.platform();
    stats.os.inet = os.networkInterfaces();


    return stats;
}

export default Stats;