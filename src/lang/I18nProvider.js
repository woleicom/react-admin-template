import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { ConfigProvider } from 'antd'
// antd组件语言
import antd_en_US from 'antd/es/locale/en_US'
import antd_zh_CN from 'antd/es/locale/zh_CN'
// react-intel本地语言及其polyfill
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/dist/locale-data/en'
import '@formatjs/intl-relativetimeformat/dist/locale-data/zh'

// 业务自定义语言
import en_US from './en_US'
import zh_CN from './zh_CN'

const antdLocale = {
  'zh-CN': antd_zh_CN,
  'en-US': antd_en_US,
}

const messages = {
  'zh-CN': zh_CN,
  'en-US': en_US,
}
//https://www.npmjs.com/package/react-intl
class I18nProvider extends PureComponent {
  render() {
    const { language } = this.props;
    return (
      <IntlProvider locale={language} key={language} messages={messages[language]}>
        <ConfigProvider locale={antdLocale[language]}>
          { this.props.children }
        </ConfigProvider>
      </IntlProvider>
    )
  }
}

export default connect()(I18nProvider)
