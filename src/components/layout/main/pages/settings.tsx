// src/components/layout/main/pages/settings.tsx
import { useMemo, useState } from 'react'
import { BellIcon, KeyIcon, LockIcon, LogOutIcon, MoonIcon, ShieldAlertIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

export default function Settings() {
  return (
    <section className="mx-auto w-full max-w-3xl flex-1">
      <header className="mb-4">
        <h1 className="text-foreground text-lg font-semibold">设置</h1>
        <p className="text-muted-foreground mt-1 text-sm">通知、隐私与账号安全。</p>
      </header>

      <div className="flex flex-col gap-4">
        <Theme />
        <Notify />
        <Privacy />
        <Account />
      </div>
    </section>
  )
}

type NotificationPrefs = {
  reply: boolean
  like: boolean
  follow: boolean
  system: boolean
}

type PrivacyPrefs = {
  profileVisibleTo: 'public' | 'followers' | 'private'
  allowDm: boolean
  searchable: boolean
}

const row = (title: string, desc: string, right: React.ReactNode) => (
  <div className="flex items-start justify-between gap-4">
    <div className="min-w-0">
      <div className="text-foreground font-medium">{title}</div>
      <div className="text-muted-foreground mt-1 text-sm">{desc}</div>
    </div>
    <div className="shrink-0">{right}</div>
  </div>
)

const Theme = () => {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const isDark = (resolvedTheme ?? theme) === 'dark'
  const themeLabel = useMemo(() => (isDark ? '深色' : '浅色'), [isDark])

  const onThemeChange = (checked: boolean) => {
    const next = checked ? 'dark' : 'light'
    setTheme(next)
    toast.success(`已切换到${next === 'dark' ? '深色' : '浅色'}主题`)
  }
  return (
    <Card className="bg-card/70">
      <CardHeader className="flex-row items-center justify-between gap-3">
        <CardTitle className="flex items-center gap-2">
          <span className="bg-card text-foreground inline-flex size-8 items-center justify-center rounded-lg">
            {isDark ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
          </span>
          外观
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">{themeLabel}</span>
          <Switch checked={isDark} onCheckedChange={onThemeChange} />
        </div>
      </CardHeader>
    </Card>
  )
}

const Notify = () => {
  const [notify, setNotify] = useState<NotificationPrefs>({
    reply: true,
    like: true,
    follow: true,
    system: true,
  })
  return (
    <Card className="bg-card/70">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <BellIcon className="size-4" />
          </span>
          通知设置
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {row(
          '回复提醒',
          '有人回复 / 提及你时通知。',
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">{notify.reply ? '已开启' : '已关闭'}</span>
            <Switch
              checked={notify.reply}
              onCheckedChange={(checked) => setNotify((p) => ({ ...p, reply: checked }))}
            />
          </div>,
        )}
        <Separator />
        {row(
          '点赞提醒',
          '有人点赞你的帖子/评论时通知。',
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">{notify.like ? '已开启' : '已关闭'}</span>
            <Switch checked={notify.like} onCheckedChange={(checked) => setNotify((p) => ({ ...p, like: checked }))} />
          </div>,
        )}
        <Separator />
        {row(
          '关注提醒',
          '有人关注你时通知。',
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">{notify.follow ? '已开启' : '已关闭'}</span>
            <Switch
              checked={notify.follow}
              onCheckedChange={(checked) => setNotify((p) => ({ ...p, follow: checked }))}
            />
          </div>,
        )}
        <Separator />
        {row(
          '系统公告',
          '活动、维护、版本更新等系统信息。',
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">{notify.system ? '已开启' : '已关闭'}</span>
            <Switch
              checked={notify.system}
              onCheckedChange={(checked) => setNotify((p) => ({ ...p, system: checked }))}
            />
          </div>,
        )}
      </CardContent>
    </Card>
  )
}

const Privacy = () => {
  const [privacy, setPrivacy] = useState<PrivacyPrefs>({
    profileVisibleTo: 'public',
    allowDm: true,
    searchable: true,
  })
  return (
    <Card className="bg-card/70">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-orange-600 text-white">
            <LockIcon className="size-4" />
          </span>
          隐私设置
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {row(
          '主页可见范围',
          '控制谁可以查看你的个人主页与发布内容。',
          <div data-slot="button-group" className="bg-card/60 ring-border flex rounded-lg p-1 ring-1">
            <Button
              variant={privacy.profileVisibleTo === 'public' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setPrivacy((p) => ({ ...p, profileVisibleTo: 'public' }))}
            >
              公开
            </Button>
            <Button
              variant={privacy.profileVisibleTo === 'followers' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setPrivacy((p) => ({ ...p, profileVisibleTo: 'followers' }))}
            >
              仅关注者
            </Button>
            <Button
              variant={privacy.profileVisibleTo === 'private' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setPrivacy((p) => ({ ...p, profileVisibleTo: 'private' }))}
            >
              私密
            </Button>
          </div>,
        )}
        <Separator />
        {row(
          '允许私信',
          '允许其他用户向你发送私信',
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">{privacy.allowDm ? '允许' : '关闭'}</span>
            <Switch
              checked={privacy.allowDm}
              onCheckedChange={(checked) => setPrivacy((p) => ({ ...p, allowDm: checked }))}
            />
          </div>,
        )}
        <Separator />
        {row(
          '搜索可见',
          '允许在站内搜索中被找到',
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">{privacy.searchable ? '开启' : '关闭'}</span>
            <Switch
              checked={privacy.searchable}
              onCheckedChange={(checked) => setPrivacy((p) => ({ ...p, searchable: checked }))}
            />
          </div>,
        )}
      </CardContent>
    </Card>
  )
}

const Account = () => {
  const [changingPwd, setChangingPwd] = useState(false)
  const [pwd, setPwd] = useState({ old: '', next: '', confirm: '' })

  return (
    <Card className="bg-card/70">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <KeyIcon className="size-4" />
          </span>
          账号与安全
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {row(
          '修改密码',
          '为了安全，建议定期更换密码。',
          <Button variant="outline" size="sm" onClick={() => setChangingPwd((v) => !v)}>
            {changingPwd ? '收起' : '修改密码'}
          </Button>,
        )}
        {changingPwd && (
          <div className="border-border bg-card/60 rounded-xl border p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <div className="text-foreground text-sm font-medium">旧密码</div>
                <Input
                  type="password"
                  className="mt-1"
                  value={pwd.old}
                  onChange={(e) => setPwd((p) => ({ ...p, old: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <div className="text-foreground text-sm font-medium">新密码</div>
                <Input
                  type="password"
                  className="mt-1"
                  value={pwd.next}
                  onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
                  placeholder="至少 8 位"
                />
              </div>
              <div>
                <div className="text-foreground text-sm font-medium">确认新密码</div>
                <Input
                  type="password"
                  className="mt-1"
                  value={pwd.confirm}
                  onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
                  placeholder="再次输入"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPwd({ old: '', next: '', confirm: '' })
                  setChangingPwd(false)
                }}
              >
                取消
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (!pwd.next || pwd.next.length < 8) return toast.error('新密码至少 8 位')
                  if (pwd.next !== pwd.confirm) return toast.error('两次输入的新密码不一致')
                  toast.success('密码已更新')
                  setPwd({ old: '', next: '', confirm: '' })
                  setChangingPwd(false)
                }}
              >
                保存
              </Button>
            </div>
          </div>
        )}

        <Separator />
        {row(
          '退出登录',
          '在当前设备退出账号。',
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.success('已退出登录')
            }}
          >
            <LogOutIcon className="mr-1 size-4" />
            退出
          </Button>,
        )}
        <Separator />
        {row(
          '注销账号',
          '永久删除账号与内容。',
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              toast.error('已发起注销')
            }}
          >
            <ShieldAlertIcon className="mr-1 size-4" />
            注销
          </Button>,
        )}
      </CardContent>
    </Card>
  )
}
