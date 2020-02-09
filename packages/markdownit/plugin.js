import MarkdownIt from 'markdown-it'

const handlePlugin = (plugin) => plugin.default || plugin

export default ({ app }, inject) => {
<%
const preset = options.preset || 'default'
delete options.preset
const plugins = options.use || []
delete options.use
options = serialize(options)
options = options === '{}' ? undefined : options
%>
  const md = new MarkdownIt('<%= preset %>', <%= options %>)
<%
  for (config of plugins) {
    const hasOpts = Array.isArray(config);
    const plugin = hasOpts ? config.shift(): config
    const opts = hasOpts ? config : []
%>
  md.use(handlePlugin(require('<%= plugin %>'))<% for(opt of opts) { %>, <%= serialize(opt) %> <% } %>)
<% } %>
  inject('md', md)
}
