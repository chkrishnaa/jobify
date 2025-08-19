import React from "react";
import { jobSeekerFeatures, employerFeatures } from "../../../utils/data";

const Features = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Everything you need to
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're looking for your next opportunity or the perfect
            candidate, JobFinder has got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          <div className="">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                For Job Seekers
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-700 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-8">
              {jobSeekerFeatures.map((feature, index) => (
                <div
                  className="group flex items-start space-x-4 p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                  key={index}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-justify">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                For Employers
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-700 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-8">
              {employerFeatures.map((feature, index) => (
                <div
                  className="group flex items-start space-x-4 p-6 rounded-2xl hover:bg-purple-100 transition-all duration-300 cursor-pointer"
                  key={index}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-justify">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
