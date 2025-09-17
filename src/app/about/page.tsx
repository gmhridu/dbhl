import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Shield, 
  Users, 
  Award, 
  Target,
  Lightbulb,
  Globe,
  Clock
} from "lucide-react";

const companyValues = [
  {
    title: "Quality",
    description: "We never compromise on quality. Every product meets the highest industry standards.",
    icon: Shield,
  },
  {
    title: "Honesty",
    description: "Transparent business practices and honest communication with all our stakeholders.",
    icon: Target,
  },
  {
    title: "Trust",
    description: "Building long-term relationships based on reliability and mutual respect.",
    icon: Users,
  },
];

const milestones = [
  {
    year: "2010",
    title: "Founded",
    description: "DBHL Enterprises was established with a vision to provide quality networking solutions.",
  },
  {
    year: "2015",
    title: "Expansion",
    description: "Expanded our product range to include fiber optic solutions and enterprise-grade equipment.",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Launched our e-commerce platform and enhanced our digital presence.",
  },
  {
    year: "2024",
    title: "Innovation Hub",
    description: "Established our R&D division focusing on next-generation networking technologies.",
  },
];

const stats = [
  {
    label: "Happy Clients",
    value: "500+",
    icon: Users,
  },
  {
    label: "Products",
    value: "1000+",
    icon: Building2,
  },
  {
    label: "Countries",
    value: "25+",
    icon: Globe,
  },
  {
    label: "Years Experience",
    value: "14+",
    icon: Clock,
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Building2 className="w-4 h-4 mr-2" />
              About DBHL Enterprises
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Building the Future of
              <span className="text-primary block">Connectivity</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Since 2010, DBHL Enterprises has been at the forefront of providing innovative networking 
              and telecommunication solutions to businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To empower businesses with cutting-edge networking and telecommunication solutions that 
                drive growth, innovation, and success in the digital age.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We are committed to delivering products and services that not only meet but exceed 
                the expectations of our clients, ensuring they have the infrastructure needed to thrive 
                in an increasingly connected world.
              </p>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-primary border-primary">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Innovation Driven
                </Badge>
                <Badge variant="outline" className="text-primary border-primary">
                  <Award className="w-4 h-4 mr-2" />
                  Excellence Focused
                </Badge>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-blue-100 rounded-2xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision 2030</h3>
                <p className="text-gray-600 mb-6">
                  To be the global leader in networking and telecommunication solutions, 
                  recognized for our innovation, quality, and customer-centric approach.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-gray-600">Customer Satisfaction</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-sm text-gray-600">Countries Served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every action we take.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <value.icon className="h-16 w-16 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our growth and development over the years.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 pr-8">
                    <Card className="p-6">
                      <div className="text-sm text-primary font-semibold mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Join Us in Building a Connected Future
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Partner with DBHL Enterprises and experience the difference that quality, honesty, and trust can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </a>
            <a 
              href="/products" 
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary transition-colors"
            >
              Explore Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}