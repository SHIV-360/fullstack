
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  CheckCircle,
  BarChart,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { getOngoingPathsForUser, getRecentActivityForUser, getTeamById } from '@/lib/api';

const OngoingPathCard = ({ path }: { path: any }) => (
    <Card className="w-full">
        <CardHeader>
            <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                <Image src={path.image?.src || `https://picsum.photos/seed/${path.id}/400/200`} alt={path.title} data-ai-hint={path.image?.hint || 'abstract'} fill className="object-cover" />
            </div>
            <CardTitle>{path.title}</CardTitle>
            <CardDescription>{path.category}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{path.progress}%</span>
            </div>
            <Progress value={path.progress} />
            <Link href={`/learn/${path.id}`} className="w-full">
                <Button className="w-full mt-4">Continue Path</Button>
            </Link>
        </CardContent>
    </Card>
);

export function OngoingPaths() {
    const { user } = useAuth();
    const [paths, setPaths] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOngoingPaths = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            setLoading(true);
            const userPaths = await getOngoingPathsForUser(user.uid);
            setPaths(userPaths); 
            setLoading(false);
        }

        fetchOngoingPaths();
    }, [user]);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Ongoing Paths</CardTitle>
          {paths.length > 0 && <Badge variant="secondary">+{paths.length} Paths</Badge>}
        </div>
      </CardHeader>
      <CardContent>
       {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full hidden md:block" />
          </div>
       ) : paths.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-48">
            <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">Start Your Journey</h3>
            <p className="text-muted-foreground mb-4">You haven't started any learning paths yet.</p>
            <Link href="/learn">
                <Button>Explore Learning Paths</Button>
            </Link>
          </div>
        ) : (
           <Carousel opts={{ align: "start", loop: paths.length > 2 }}>
            <CarouselContent>
              {paths.map((path) => (
                <CarouselItem key={path.id} className="md:basis-1/2">
                   <OngoingPathCard path={path} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        )}
      </CardContent>
    </Card>
  );
}

export function LearningHoursChart() {
    const { user } = useAuth();
    const [learningHoursData, setLearningHoursData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLearningData = () => {
            if (!user) {
                setLoading(false);
                return;
            }
            setLoading(true);
            // This would be replaced with a real API call
            const data = Array.from({ length: 7 }).map((_, i) => {
                const date = new Date();
                date.setDate(new Date().getDate() - (6 - i));
                return {
                    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    hours: Math.random() * 4,
                }
            });
            setLearningHoursData(data);
            setLoading(false);
        }
        fetchLearningData();
    }, [user]);

  const maxHours = 5;

  return (
    <Card className='h-full'>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Learning Hours</CardTitle>
        <p className="text-sm text-muted-foreground">Last 7 Days</p>
      </CardHeader>
      <CardContent className="h-64">
        {loading ? (
            <Skeleton className="h-full w-full" />
        ) : learningHoursData.length === 0 ? (
           <div className="flex flex-col items-center justify-center text-center h-full">
             <BarChart className="w-12 h-12 text-muted-foreground mb-4" />
             <h3 className="text-lg font-bold mb-1">No Activity Yet</h3>
             <p className="text-muted-foreground text-sm">Complete labs to see your progress.</p>
           </div>
        ) : (
            <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
                data={learningHoursData}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                barCategoryGap="30%"
            >
                <XAxis
                dataKey="day"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                domain={[0, maxHours]}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}h`}
                />
                <Tooltip
                cursor={{ fill: 'hsla(var(--card))' }}
                content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                    return (
                        <div className="bg-card p-2 rounded-lg border">
                        <p className="text-sm">{`${payload[0].value} hours`}</p>
                        </div>
                    );
                    }
                    return null;
                }}
                />
                <Bar dataKey="hours" radius={[10, 10, 10, 10]}>
                {learningHoursData.map((entry, index) => (
                    <Cell
                    key={`cell-${index}`}
                    fill={'hsl(var(--primary))'}
                    opacity={0.2 + (entry.hours / maxHours) * 0.8}
                    />
                ))}
                </Bar>
            </RechartsBarChart>
            </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export function ActivityFeed() {
    const { user } = useAuth();
    const [recentActivities, setRecentActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            setLoading(true);
            const activities = await getRecentActivityForUser(user.uid);
            setRecentActivities(activities);
            setLoading(false);
        }
        fetchActivities();
    }, [user]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
       {loading ? (
         <div className="space-y-4">
            {Array.from({length: 4}).map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                </div>
            ))}
         </div>
       ) : recentActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-full pt-8 pb-8">
            <CheckCircle className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-bold mb-1">No Recent Activity</h3>
            <p className="text-muted-foreground text-sm">Your achievements will appear here.</p>
          </div>
        ) : (
            <ul className="space-y-4">
            {recentActivities.map((activity) => (
                <li key={activity.id} className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                    <p>{activity.description}</p>
                    <p className="text-sm text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                </div>
                </li>
            ))}
            </ul>
        )}
      </CardContent>
    </Card>
  );
}

export function TeamWidget() {
    const { user, userData } = useAuth();
    const [team, setTeam] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyTeam = async () => {
            if (!user || !userData?.teamId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            const teamData = await getTeamById(userData.teamId);
             // In a real app, you'd fetch member details.
             // For now, we'll mock them based on the logged-in user.
            if (teamData) {
                teamData.members = [
                    { uid: user.uid, username: user.displayName, photoURL: user.photoURL, role: "Leader" }
                ];
            }
            setTeam(teamData);
            setLoading(false);
        }
        fetchMyTeam();
    }, [user, userData]);

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="text-primary" /> My Team
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
            <div className="p-8"><Skeleton className="h-40 w-full" /></div>
        ) : !team ? (
           <div className="flex flex-col items-center justify-center text-center p-8">
             <Users className="w-12 h-12 text-muted-foreground mb-4" />
             <h3 className="text-lg font-bold mb-1">No Team Yet</h3>
             <p className="text-muted-foreground text-sm mb-4">Join or create a team to compete.</p>
             <div className="flex gap-2">
                <Button>Create Team</Button>
                <Button variant="outline">Join a Team</Button>
             </div>
           </div>
        ) : (
            <>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 mb-6">
                <h3 className="text-2xl font-bold">{team.name}</h3>
                <p className="text-muted-foreground">Global Rank: <span className="font-bold text-primary">#{team.rank}</span></p>
            </div>
            <div className="space-y-4">
            {team.members.map((member: any) => (
                <div key={member.uid} className="flex items-center justify-between bg-card p-3 rounded-md">
                <div className="flex items-center gap-3">
                    <Avatar>
                    <AvatarImage src={member.photoURL} alt={member.username} />
                    <AvatarFallback>{member.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                    <p className="font-semibold">{member.username}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                </div>
                <Button variant="ghost" size="sm">View</Button>
                </div>
            ))}
            </div>
            <Button className="mt-6">Manage Team</Button>
            </>
        )}
      </CardContent>
    </Card>
  );
}
