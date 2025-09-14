
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { User } from 'firebase/auth';
import {
  BarChart,
  BookOpen,
  CheckCircle,
  Flame,
  FlaskConical,
  ShieldCheck,
  Smartphone,
  Star,
  Trophy,
} from 'lucide-react';
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export function ProfileHeader({
  user,
  userData,
}: {
  user: User;
  userData: any;
}) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={user.photoURL || ''}
            alt={user.displayName || 'User'}
          />
          <AvatarFallback className="text-3xl">
            {user.displayName ? getInitials(user.displayName) : 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold">{user.displayName}</h2>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="mt-2 flex justify-center sm:justify-start gap-2">
            {userData.role === 'admin' && (
              <Badge variant="destructive">Admin</Badge>
            )}
            {userData.subscription === 'pro' && (
              <Badge variant="outline" className="border-primary text-primary">
                Pro Member
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <Card className="flex-1">
    <CardContent className="p-4 flex items-center gap-4">
      <div className="bg-primary/10 p-3 rounded-lg text-primary">{icon}</div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </CardContent>
  </Card>
);

export function QuickStats({ stats }: { stats: any }) {
  return (
    <div className="flex flex-wrap gap-4">
      <StatCard icon={<Star className="h-6 w-6" />} label="Level" value={stats.level} />
      <StatCard icon={<BarChart className="h-6 w-6" />} label="XP" value={`${stats.xp} / 1500`} />
      <StatCard icon={<CheckCircle className="h-6 w-6" />} label="Labs Completed" value={stats.completed} />
      <StatCard icon={<Flame className="h-6 w-6" />} label="Day Streak" value={stats.streak} />
    </div>
  );
}

export function LearningProgress({ progress }: { progress: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Learning Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Keep going!</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}

export function SkillsAssessment({ skills }: { skills: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Assessment</CardTitle>
        <CardDescription>
          Your estimated proficiency in different forensic domains.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={skills}
            layout="vertical"
            margin={{ top: 5, right: 10, left: 20, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="skill"
              type="category"
              tickLine={false}
              axisLine={false}
              width={150}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              cursor={{ fill: 'hsla(var(--card))' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card p-2 rounded-lg border">
                      <p className="text-sm">{`${payload[0].value}% proficiency`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="progress" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}


const achievementIconMap: { [key: string]: React.ReactNode } = {
    CheckCircle: <CheckCircle className="h-6 w-6" />,
    ShieldCheck: <ShieldCheck className="h-6 w-6" />,
    Smartphone: <Smartphone className="h-6 w-6" />,
    Trophy: <Trophy className="h-6 w-6" />,
    FlaskConical: <FlaskConical className="h-6 w-6" />,
    BookOpen: <BookOpen className="h-6 w-6" />,
};


export function Achievements({ achievements }: { achievements: any[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                    {achievements.map(ach => (
                        <div key={ach.title} className="flex flex-col items-center gap-2">
                             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary" title={ach.title}>
                                {achievementIconMap[ach.icon] || <Star className="h-6 w-6" />}
                            </div>
                            <p className="text-xs text-muted-foreground">{ach.title}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
