// src/components/layout/main/pages/settings.tsx
import { BellIcon, CheckIcon, KeyIcon, LockIcon, LogOutIcon, PaletteIcon, ShieldAlertIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import {
  type ThemeMode,
  type ThemePreset,
  applyThemePreset,
  getStoredThemePreset,
  getThemePresets,
  saveThemePreset,
} from '@/lib/theme-presets'
import { cn } from '@/lib/utils'
import { useLocalStorage } from '@/shared/lib/hooks/use-local-storage'

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

const defaultNotificationPrefs: NotificationPrefs = {
  reply: true,
  like: true,
  follow: true,
  system: true,
}

const defaultPrivacyPrefs: PrivacyPrefs = {
  profileVisibleTo: 'public',
  allowDm: true,
  searchable: true,
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

const Theme = () => {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const mode = ((resolvedTheme ?? theme) === 'dark' ? 'dark' : 'light') as ThemeMode
  const isDark = mode === 'dark'
  const themeLabel = useMemo(() => (isDark ? '深色' : '浅色'), [isDark])
  const themes = useMemo(() => getThemePresets(), [])
  const [selectedTheme, setSelectedTheme] = useState<ThemePreset>(() => getStoredThemePreset())

  const onThemeChange = (checked: boolean) => {
    const next = checked ? 'dark' : 'light'
    setTheme(next)
    applyThemePreset(selectedTheme, next)
    toast.success(`已切换到${next === 'dark' ? '深色' : '浅色'}主题`)
  }

  useEffect(() => {
    applyThemePreset(selectedTheme, mode)
  }, [mode, selectedTheme])

  const onSelectTheme = (preset: ThemePreset) => {
    setSelectedTheme(preset)
    saveThemePreset(preset.id)
    applyThemePreset(preset, mode)
    toast.success(`已应用 ${preset.title}`)
  }

  return (
    <Card className="bg-card/70">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary inline-flex size-8 items-center justify-center rounded-lg">
              <PaletteIcon className="size-4" />
            </span>
            主题
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">{themeLabel}</span>
            <Switch checked={isDark} onCheckedChange={onThemeChange} />
          </div>
        </div>
        <p className="text-muted-foreground text-sm">选择一个主题配色，颜色会立即应用到全站。</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-foreground text-sm font-medium">主题预设</h3>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {themes.map((preset) => {
            const active = preset.id === selectedTheme.id

            return (
              <button
                key={preset.id}
                type="button"
                aria-pressed={active}
                disabled={active}
                onClick={() => onSelectTheme(preset)}
                className={cn(
                  'group border-border/70 bg-card/80 hover:border-primary/60 hover:bg-card flex flex-col gap-3 rounded-2xl border p-3 text-left transition-all duration-200',
                  active && 'border-primary/70 ring-primary/20 ring-2',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-foreground truncate text-sm font-semibold">{preset.title}</div>
                    <div className="text-muted-foreground mt-1 text-xs">当前主题配色</div>
                  </div>
                  {active && (
                    <Label className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2 py-1">
                      <CheckIcon className="size-3" />
                    </Label>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {preset.preview.map((color, index) => (
                    <span
                      key={`${preset.id}-${index}`}
                      className="h-12 rounded-xl border border-white/10 shadow-sm transition-transform group-hover:-translate-y-0.5"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

const Notify = () => {
  const [notify, setNotify] = useLocalStorage<NotificationPrefs>(
    'forum-settings-notifications',
    defaultNotificationPrefs,
  )

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
  const [privacy, setPrivacy] = useLocalStorage<PrivacyPrefs>('forum-settings-privacy', defaultPrivacyPrefs)

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
