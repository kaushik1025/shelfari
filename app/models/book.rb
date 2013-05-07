class Book < ActiveRecord::Base
  attr_accessible :author, :status, :title
end
