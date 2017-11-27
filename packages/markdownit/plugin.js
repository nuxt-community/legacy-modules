import MarkdownIt from 'markdown-it'

export default ({ app }, inject) => {
<%
const plugins = options.use || []
delete options.use
options = serialize(options)
options = options === '{}' ? undefined : options
%>
  const md = new MarkdownIt(<%= options %>)
<%
  for (config of plugins) {
    const hasOpts = Array.isArray(config);
    const plugin = hasOpts ? config.shift(): config
    const opts = hasOpts ? config : []
%>
  md.use(require('<%= plugin %>')<% for(opt of opts) { %>, <%= serialize(opt) %> <% } %>)
<% } %>
  inject('md', md)
}
