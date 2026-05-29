

function Stats(params) {
    return (
        <>
            <div style="display: flex;">
                <div>

                    <table>
                        <tr>
                            <td>server version</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>server uptime</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>operating system</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>kernel version</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>hostname</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>server timezone</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>server envorenements</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>website link</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>website status</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>SSL certificate expiration</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>domain expiration date</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>DNS records of web service</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>reverse proxy</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>database engine</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>database size</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>database uptime</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>cache system</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>exposed API</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>exposed admin API</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>API version</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>last deployment</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>git commit hash</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>build version</td>
                            <td></td>
                        </tr>

                    </table>
                </div>

                <div>

                    <table>
                        <tr>
                            <td>CPU</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>CPU temperature</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>CPU load average</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>RAM</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>total storage consumed</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>free storage remaining</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>total storage consumed by images</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>total storage consumed by logs</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>network upload speed</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>network download speed</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>total bandwidth used</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>active connections</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>interfaces listening on</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>open ports</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>running services</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>failed services</td>
                            <td></td>
                        </tr>

                    </table>
                </div>
            </div>

            <div>
                <div>

                    <button>show received requests</button>
                    <button>show requests by endpoint</button>
                    <button>show requests by method</button>
                    <button>show requests by status code</button>
                    <button>show slow requests</button>
                    <button>show failed requests</button>
                    <button>show blocked requests</button>
                    <button>show ips by country</button>
                    <button>show top visitor ips</button>
                    <button>show user agents</button>
                    <button>show bots/crawlers</button>
                    <button>show login attempts</button>
                    <button>show admin activity</button>
                    <button>show bandwidth usage</button>
                    <button>show storage history</button>
                    <button>show server load history</button>
                    <button>show API usage</button>
                    <button>show error logs</button>
                    <button>show deployment history</button>

                    <select>
                        <option value="">1 hour</option>
                        <option value="">12 hours</option>
                        <option value="">1 day</option>
                        <option value="">7 days</option>
                        <option value="">30 days</option>
                        <option value="">6 months</option>
                        <option value="">1 year</option>
                    </select>

                </div>
            </div>
        </>);
}

export default Stats;